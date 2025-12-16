# Overview

This page summarizes the data products available from the NISAR mission.

## Level 3

Level 3 products represent geophysical parameters derived from radar-specific parameters and geocoded to a geographic grid.

- The [Soil Moisture (SME2)](level-3/sme2.md) product contains soil moisture estimates derived from NISAR data using three different algorithms at agricultural field-scale (200m) posting. Soil moisture information can be used for reservoir management, early warning of droughts, irrigation scheduling, and crop yield forecasting.

## Level 2

Level 2 products are derived radar-specific parameters resampled and geocoded to a geographic grid. They can be directly overlaid on a map and combined with other data in geographic coordinates.

- The [Geocoded SLC (GSLC)](level-2/gslc.md) product represents the single look complex signal return for each polarization in geographic coordinates. The GSLC product enables users to perform backscatter amplitude analysis, and can be combined with other similar GSLC products to derive interferograms and change maps.
- The [Geocoded Pixel Offsets (GOFF)](level-2/goff.md) product represents a collection of dense pixel offsets layers obtained from applying speckle tracking to a pair of coarsely coregistered RSLCs in geographic coordinates. The GOFF product is primarily meant for Cryosphere applications.
- The [Geocoded Polarimetric Covariance Matrix (GCOV)](level-2/gcov.md) product provides radiometrically terrain corrected SAR backscatter data to primarily support the NISAR ecosystem requirements of biomass estimation, soil moisture estimation, disturbance detection, inundation mapping, and crop area delineation.
- The [Geocoded Unwrapped Interferogram (GUNW)](level-2/gunw.md) product represents the unwrapped, multi-looked differential interferogram generated from two RSLCs in geographic coordinates. The GUNW product primarily supports the solid earth requirement of ground surface displacement measurements.

## Level 1

Level 1 products are processed instrument data, focused to full resolution complex images, time referenced and annotated with ancillary information, including radiometric and relevant geometric calibration coefficients and georeferencing parameters (i.e. platform ephemeris) computed and appended, in natural radar coordinates. They cannot be directly overlaid on a map.

- The [Range-Doppler Single Look Complex (RSLC)](level-1/rslc.md) product contains focused SAR images in range-Doppler coordinates.
- The [Range-Doppler Interferogram (RIFG)](level-1/rifg.md) product represents the ellipsoid height-corrected, wrapped interferogram generated from two RSLCs in range-Doppler coordinates. The RIFG product is primarily meant for detecting grounding lines.
- The [Range-Doppler Pixel Offsets (ROFF)](level-1/roff.md) product represents a collection of dense pixel offsets layers obtained from applying speckle tracking to a pair of coarsely coregistered RSLCs in range-Doppler coordinates. The ROFF product is primarily meant for Cryosphere applications.
- The [Range-Doppler Unwrapped Interferogram (RUNW)](level-1/runw.md) product represents the unwrapped, multi-looked differential interferogram generated from two RSLCs in range-Doppler coordinates. The RUNW product primarily supports the solid earth requirement of ground surface displacement measurements.

## Level 0

Level 0 products are unprocessed instrument data. They require specialized software to interpret and are generally not recommended for use by science applications.

- The [Radar Raw Signal Data (RRSD)](level-0/rrsd.md) product contains corrected, aligned radar pulse data.

## Summary

The table below summarizes the characteristics of NISAR data products with respect to pixel spacing and primary as well as ancillary data layers. 

```{figure} /assets/nisar-data-products-overview.png
:label: overview
:alt: NISAR data product overview
:align: center

NISAR data product overview
```
