$ErrorActionPreference = "Stop"

$clusterName = "devops-bootcamp"
$registryName = "kind-registry"
$registryPort = 5000

Write-Host "==> Ensuring local registry ($registryName) is running on port $registryPort..."
$existingRegistry = docker ps -a --format "{{.Names}}" | Select-String -SimpleMatch $registryName -Quiet
if (-not $existingRegistry) {
  docker run -d --restart=always -p "${registryPort}:5000" --name $registryName registry:2 | Out-Null
} else {
  $running = docker ps --format "{{.Names}}" | Select-String -SimpleMatch $registryName -Quiet
  if (-not $running) {
    docker start $registryName | Out-Null
  }
}

Write-Host "==> Ensuring kind cluster ($clusterName) exists..."
$clusters = kind get clusters 2>$null
if ($LASTEXITCODE -ne 0) {
  throw "kind not found. Install kind and try again."
}

if (-not ($clusters | Select-String -SimpleMatch $clusterName -Quiet)) {
  kind create cluster --name $clusterName --config .\infra\kind\kind-config.yaml
}

Write-Host "==> Connecting registry to kind network (ignore error if already connected)..."
try {
  docker network connect kind $registryName | Out-Null
} catch {
  # ignore
}

Write-Host "==> Publishing local registry info to the cluster..."
kubectl apply -f .\infra\kind\local-registry-hosting.yaml | Out-Null

Write-Host "==> Generating kubeconfig for Jenkins (container-to-kind network)..."
$jenkinsLocalDir = ".\ci\jenkins\.local"
New-Item -ItemType Directory -Force -Path $jenkinsLocalDir | Out-Null

$kubeconfig = kind get kubeconfig --name $clusterName
$kubeconfig = $kubeconfig -replace '(?m)^\s*certificate-authority-data:.*\r?\n', ''
$kubeconfig = $kubeconfig -replace '(?m)^\s*server:\s*https://(127\.0\.0\.1|0\.0\.0\.0|localhost):\d+\s*$', "    server: https://$clusterName-control-plane:6443`n    insecure-skip-tls-verify: true"

$kubeconfigPath = Join-Path $jenkinsLocalDir "kubeconfig.yaml"
$kubeconfig | Set-Content -Path $kubeconfigPath -Encoding UTF8

Write-Host "==> Done. Registry: localhost:5000 | Cluster: $clusterName"
