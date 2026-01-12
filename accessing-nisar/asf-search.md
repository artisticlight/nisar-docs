# ASF Search Python Package

[ASF's `asf_search` Python package](https://pypi.org/project/asf-search/) enables quick and customizable programmatic access to NISAR data. For more information on getting started, visit [ASF's Data Search Manual](https://docs.asf.alaska.edu/asf_search/basics/).

<!-- TODO: Add in minimum asf_search version that allows for NISAR searches -->

To quickly begin exploring NISAR data, search by setting the `dataset` parameter to `'NISAR'` and the `processingLevel` parameter to the four-letter acronym corresponding to your desired product. For example, to search for NISAR GCOV products, use the following command:
```
results = asf_search.search(dataset='NISAR', processingLevel='GCOV')
``` 
A list of accepted `processingLevel` constants is available [here](https://github.com/asfadmin/Discovery-asf_search/blob/master/asf_search/constants/PRODUCT_TYPE.py). 

See the [Searching page of the Data Search Manual](https://docs.asf.alaska.edu/asf_search/searching/)
 for more details on available search filters and their possible values.