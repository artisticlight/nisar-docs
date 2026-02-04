---
short_title: Earthdata Search
---
# Finding NISAR Data with Earthdata Search

(earthdata-search-overview)=
## Earthdata Search
[Earthdata Search](https://search.earthdata.nasa.gov/ ) is a web application developed by [NASA'S Earth Science Data and Information System (ESDIS)](https://www.earthdata.nasa.gov/about/esdis) that allows users to search, compare, visualize, and access to NASA's Earth science data collections.  

## Using Earthdata Search to Access NISAR Data 

### 1. Go to https://search.earthdata.nasa.gov/ and log in using your Earthdata credentials
Upon navigating to [Earthdata Search](https://search.earthdata.nasa.gov/ ), users can log in using their [Earthdata login credentials](https://urs.earthdata.nasa.gov/) to download data.  An EDL account is free to create and provides unified access to Earth science data distributed by [NASA'S Earth Observation System Data and Information System (EOSDIS)](https://www.earthdata.nasa.gov/about/esdis/eosdis), independent of the data provider.

### 2. Search for NISAR data products
Searching for NISAR products can be done using the search bar or the filter selection. 

To search for a specific product type, you can input the product name or short name from @tbl:earthdata-search-shortname-list. 

:::{table} NISAR Data Product Earthdata Search Short Name List
:label: tbl:earthdata-search-shortname-list

| Product | Short Name            |
|---------|-----------------------|
| SME2    | NISAR_L3_SME2_BETA_V1 |
| GCOV    | NISAR_L2_GCOV_BETA_V1 |
| GUNW    | NISAR_L2_GUNW_BETA_V1 |
| GOFF    | NISAR_L2_GOFF_BETA_V1 |
| GSLC    | NISAR_L2_GSLC_BETA_V1 |
| RUNW    | NISAR_L1_RUNW_BETA_V1 |
| RIFG    | NISAR_L1_RIFG_BETA_V1 |
| ROFF    | NISAR_L1_ROFF_BETA_V1 |
| RSLC    | NISAR_L1_RSLC_BETA_V1 |

:::

To search for all NISAR data products, use the filter options on the left-hand side of the window, as seen in @earthdata-search-nisar-filters. By setting the "platform" filter to `NISAR` and the "Processing Level" filter to the processing level you are interested in, the desired products will be listed. 
```{figure} ../assets/earthdata-search-nisar-filters.png
:label: earthdata-search-nisar-filters
:alt: Screenshot showing the platform and processing level filters in Earthdata Search selected to be NISAR and Level 2 and Level 3, respectively. 
:align: center

Setting the platform filter to NISAR and the processing level to 2 and 3 will filter to show analysis-ready NISAR data products.
```

### 3. Filter NISAR data for desired granule
Once you've narromed down to the data type you are looking for, you can search products via a variety of filters. A selection of filters appears on the left-hand side of the screen, as shown by @earthdata-search-filters
* Results can be filtered using parameters:
  * Granule ID
  * Spatial AOI
  * Temporal Range
  * Orbit Number
  * Data Access

```{figure} ../assets/earthdata-search-filters.png
:label: earthdata-search-filters
:alt: Screenshot showing the "Filter Granules" bar for GCOV products.  
:align: center

Filter Earthdata Search results to refine the number of granules to your desired area of interest. 
```

To search for a specific geographic region, use the `Spatial Search` button. This will prompt you to enter coordinates or draw a rectangle, polygon, circle, or point or enter a geospatial file to search. 

```{figure} ../assets/earthdata-search-spatial-search.png
:label: earthdata-search-spatial-search
:alt: Screenshot showing a rectangular spatial search of GCOV products. 
:align: center

Search by drawing a region of interest or entering coordinates using the "Spatial" search filter. This example shows a rectangular search, but users can also search using a polygon, circle, point, or geospatial file. 
```

To search for products during a specific date range, use the `Temporal Search` button. A date range can be entered and then searched for. 

```{figure} ../assets/earthdata-search-temporal-search.png
:label: earthdata-search-temporal-search
:alt: Screenshot showing the temporal search of GCOV products. 
:align: center

Search using a date range with the "Temporal" search filter. 
```

### 4. Download data
* Individual granules can be downloaded directly through the results. 
* To learn more about downloading multiple files at once, visit the [NASA Earthdata Cloud Cookbook](https://nasa-openscapes.github.io/earthdata-cloud-cookbook/how-tos/find-data/earthdata_search.html). 

```{figure} ../assets/earthdata-search-download-GCOV.png
:label: earthdata-search-download-GCOV
:alt: Screenshot showing how to select and download a single GCOV granule.  
:align: center

Click the download icon, toggle to "Download Files", and click the download icon next to the filename to download your desired granule directly. 
```