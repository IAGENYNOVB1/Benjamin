#!/usr/bin/env zsh
set -euo pipefail

# Start from project root
pushd /home/benjamin/ynov/Yboost/Benjamin/cv-site >/dev/null

# Kill any previous python http.server on common ports
for port in 8000 8010 8015; do
  pids=($(lsof -ti tcp:$port 2>/dev/null))
  if [[ ${#pids[@]} -gt 0 ]]; then
    echo "Killing http.server on port $port: ${pids[@]}"
    kill -9 ${pids[@]} || true
  fi
done

# Bind strictly to localhost and launch
echo "Starting server at http://127.0.0.1:8000"
python3 -m http.server 8000 --bind 127.0.0.1
