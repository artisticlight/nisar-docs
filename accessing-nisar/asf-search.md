# ASF Search Python Package

[ASF's `asf_search` Python package](https://pypi.org/project/asf-search/) enables quick and customizable programmatic access to NISAR data. For more information on getting started, visit [ASF's Data Search Manual](https://docs.asf.alaska.edu/asf_search/basics/).

To quickly begin exploring NISAR data, use the following command:
```
results = asf_search.search(platform='NISAR', processingLevel='GCOV')
```
Search for other NISAR data product types by replacing the `processingLevel` parameter with the four-letter acronym corresponding to your desired product.

See the [Searching page of the Data Search Manual](https://docs.asf.alaska.edu/asf_search/searching/)
 for details on available search filters and their possible values.