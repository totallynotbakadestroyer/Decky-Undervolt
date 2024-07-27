#!/bin/sh
set -e

cd /backend

echo "--- Building ryzenadj lib ---"
git clone https://github.com/FlyGoat/RyzenAdj /tmp/ryzenadj
cd /tmp/ryzenadj
#git checkout -q v0.14.0
mkdir build && cd build
cmake -DCMAKE_BUILD_TYPE=Release .. || exit 1
make || exit 1
mv libryzenadj.so /backend/out/libryzenadj.so || exit 1
mv ryzenadj /backend/out/ryzenadj || exit 1
cd /backend

echo "--- Cleaning up ---"
# remove newly-cloned git repo and artifacts
rm -rf ./ryzenadj
