#!/bin/sh
set -e

cd /backend

echo "--- Building gymdeck2 & ryzenadj libs ---"
git clone https://github.com/FlyGoat/RyzenAdj /tmp/ryzenadj
git clone https://github.com/totallynotbakadestroyer/gymdeck2.git /tmp/gymdeck2
cd /tmp/ryzenadj
#git checkout -q v0.14.0
mkdir build && cd build
cmake -DCMAKE_BUILD_TYPE=Release .. || exit 1
make || exit 1
mv libryzenadj.so /tmp/gymdeck2/lib || exit 1
cd .. && cd lib
mv ryzenadj.h /tmp/gymdeck2/include
cd .. && cd .. && cd gymdeck2 
cmake -DCMAKE_BUILD_TYPE=Release || exit 1 
make || exit 1
mv gymdeck2 /backend/out/gymdeck2 || exit 1
cd /backend

echo "--- Cleaning up ---"
# remove newly-cloned git repo and artifacts
rm -rf ./ryzenadj
rm -rf ./gymdeck2
