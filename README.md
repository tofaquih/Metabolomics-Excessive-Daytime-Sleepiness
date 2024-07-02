# Follow the link to explore the network: https://tofaquih.github.io/Metabolomics-Excessive-Daytime-Sleepiness/ 

# Metabolomic Profile of Excessive Daytime Sleepiness in the Hispanic Community Health Study/Study of Latinos
Excessive daytime sleepiness (EDS) is a prevalent condition estimated to affect up to 33% of the United States population. EDS is a heterogeneous and complex symptom of various sleep disorders, insufficient sleep, and other chronic conditions and medications. EDS has also been associated with increased risk of cardiovascular and neuropsychiatric diseases, potentially through bidirectional causal pathways. In this study, we used metabolomic measurements in 6071 individuals from the Hispanic Community Health Study/Study of Latinos to elucidate the metabolomic factors associated with EDS.
# Methods
We used a three-way approach to produce an interactive network.
* **A method to capture statistically significant correlations between the measured metabolites:**
  First, gaussian graphical modelling (GGM) using sparse inverse covariance estimation with the graphical lasso was used to calculate the correlations between the metabolites measured in the HCHS/SOL study. 
* **A pathway enrichment analysis using results from MetaboAnalyst:**
  Selected metabolites and a selection of genes previously found to be associated with EDS were supplied to the MetaboAnalyst 6.0 online metabolomics analysis suite to perform a pathway analysis based on global testing and “Metabolite Set Enrichment Analysis”
* **Explication of a biologically driven network between the metabolites and known reactions and pathways:**
  Results of the joint pathway analysis and the pathway enrichment analysis were then combined with the GMM network developed in the first step.
  Additional annotations were added to the network within Cytoscape using the Metscape plug-in

The network was then converted to Cytoscape JS format with addtional features coded in.

# How to use:
- Select a network from the *Active dataset* drop down menu
- Click and hold on an empty area with the left mouse button to move the entire network
- Use the mosue wheel to zoom in and out on the cursor location
- Click and hold the right mouse button on a node to see the menu options
- While holding the right mouse button, hover the cursor to the left or right menu options, then let go of the right mouse button to select the menu option
- The selected information will appear on the right side of the screen
- The *Analysis Results* option will show the results for linear regression analysis for applicable metabolite nodes, such as p value, beta etc.
- The *Info*  option will show the Name, Pathway, KEGG ID, HMDB ID, and other relavent information.

# Citation:
Tariq Faquih, Bing Yu, Robert Kaplan, Carmen Isasi, Susan Redline, Tamar Sofer, Heming Wang, 0032 Metabolomic Profile of Excessive Daytime Sleepiness in the Hispanic Community Health Study/Study of Latinos, Sleep, Volume 47, Issue Supplement_1, May 2024, Pages A14–A15, https://doi.org/10.1093/sleep/zsae067.0032
