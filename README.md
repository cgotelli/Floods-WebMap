# Floods-WebMap

## Overview

This repository provides a complete workflow for converting hydrodynamic simulation outputs (from [Iber](https://www.iberaula.es/)) into georeferenced PNG images and then displaying them on an interactive Leaflet map with time controls, measurement tools, and drawing capabilities. All the required JavaScript and CSS libraries (Leaflet, TimeDimension, etc.) are loaded from CDNs, so **no local installation** of these libraries is needed.

## Repository Structure

```raw
.
├── simulation_files/
│   ├── asc_files/      # Original .asc files from Iber (ASCII raster grids)
│   └── png_files/      # Generated PNG files (after running the notebook)
├── build_map.ipynb     # Jupyter notebook that processes ASC -> PNG and generates HTML
├── legend.png          # Generated vertical legend image
├── my_map.html       	# Final HTML map (Leaflet + TimeDimension + measure + draw)
└── README.md         	# This README
```

1. **simulation_files/asc/**  
   - Contains the exported `.asc` files from your Iber hydrodynamic simulation.  
   - In the future, we plan to include scripts for [HEC-RAS v6](https://www.hec.usace.army.mil/software/hec-ras/) exports as well.

2. **simulation_files/png/**  
   - Where the newly generated `.png` files are stored (after running the Python conversion script in the notebook).

3. **build_map.ipynb**  
   - A Jupyter notebook that reads `.asc` files, converts them to `.png` with a color gradient (light blue to dark blue, black for exceedances), and then auto-generates a vertical legend (`legend.png`).  
   - Finally, it exports an HTML file (`my_map.html`) that references these PNG files via Leaflet TimeDimension.

4. **my_map.html**  
   - The interactive map that uses time-based overlays (one PNG per time step), measuring tools, and drawing tools.  
   - All JavaScript/CSS references are loaded from online CDNs (no local JS installation required).

5. **legend.png**  
   - A partially transparent (50% background) image showing the color scale used for depth.  
   - The color bar and text are fully opaque.

## Steps / Workflow

1. **Place `.asc` files** from Iber in `simulation_files/asc/`.  
   - Make sure they follow the `Depth____XXXX.asc` naming convention if you want them to be sorted and recognized by the code.

2. **Open `build_map.ipynb`**  
   - Adjust parameters at the top (e.g., path to input/output directories, maximum depth, coordinate systems, etc.).  
   - Run all cells. 
   - The notebook:
     1. Reads each `.asc` file, reprojects and converts it to a PNG using `rasterio`/`pyproj`.  
     2. Generates a color gradient (light blue → dark blue, black for values beyond user-defined max).  
     3. Creates a vertical legend (`legend.png`) using `Pillow`.  
     4. Exports an HTML file (`my_map.html`) that references your PNG files via Leaflet TimeDimension.

3. **Open `my_map.html`**  
   - The map is centered on the bounding box computed from the `.asc` → `.png` process.  
   - Includes a time slider for animation, measuring tool, and drawing tool.  
   - Loads all resources from **CDNs**, so you do not need local Leaflet or plugin installs.

## Future Plans

- Currently, the workflow handles ASCII grids from [Iber](https://www.iberaula.es/). 
- In the future, we plan to add an equivalent process for [HEC-RAS v6](https://www.hec.usace.army.mil/software/hec-ras/).

## Technical Details

- **Python Libraries**: 
  - `rasterio`, `pyproj`, and `Pillow` for reading `.asc` files, reprojecting, coloring, and legend creation.
  - `rasterio.io.MemoryFile` to handle intermediate in-memory files.
  - `numpy` for array manipulation.
- **Leaflet Plugins** (all loaded from CDNs):
  - **Leaflet**: Base interactive map library.
  - **Leaflet.TimeDimension**: For frame-by-frame overlays (time-based).
  - **Leaflet.draw**: Allows user to draw polygons, lines, etc.
  - **Leaflet.Measure**: Adds tools for measuring distance/area.
  - **FontAwesome** (CDN) for icons (optional).
- **No local installations** are required for the map itself—everything runs from CDN references once the HTML is opened.

## Contact / License

- This repository is published under the MIT License (unless otherwise stated).  
- Feel free to fork and adapt for other hydrodynamic models.  
- Issues and pull requests welcome!
