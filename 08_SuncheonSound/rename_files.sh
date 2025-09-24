#!/bin/bash

# This script renames files to remove spaces for better web compatibility
echo "Renaming files to remove spaces..."

# Rename MP3 files
cd mp3
for file in *.mp3; do
    if [[ "$file" == *" "* ]]; then
        newname="${file// /_}"
        echo "Renaming: $file -> $newname"
        mv "$file" "$newname"
    fi
done
cd ..

# Rename image files
cd img
for file in *.jpg *.png *.jpeg; do
    if [[ -f "$file" && "$file" == *" "* ]]; then
        newname="${file// /_}"
        echo "Renaming: $file -> $newname"
        mv "$file" "$newname"
    fi
done
cd ..

echo "Done! Files renamed."