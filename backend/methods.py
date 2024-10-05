from flask import Flask, request, render_template
import matplotlib.pyplot as plt
import pandas as pd
import io
import base64

def agroConditions():
    # Replace with your logic to determine conditions
    return {
        "condition": "optimal",
        "temperature": "20°C",
        "humidity": "60%"
    }


# Syntax for calling
# URL + post_body
# URL = https://built_villanueva_carlos:f1G1B2d9Ea@api.meteomatics.com/ #Use this always

# post_body = /2024-10-05T00:00:00Z/t_2m:F/40.111514410606915,-88.21970775284188/html #Example, shows weather in urbana roughly at my 

# read the data into a pandas dataframe

'''
-BEGIN HEADER-
NASA/POWER CERES/MERRA2 Native Resolution Climatology Climatologies 
30-year Meteorological and Solar Monthly & Annual Climatologies (January 1990 - December 2019) 
Location: Regional 
Elevation from MERRA-2: Average for 0.5 x 0.625 degree lat/lon region = na meters
The value for missing source data that cannot be computed or is outside of the sources availability range: -999 
Parameter(s): 
YEAR                Year
RH2M                MERRA-2 Relative Humidity at 2 Meters (%) 
T2M_MAX             MERRA-2 Temperature at 2 Meters Maximum (C) 
PRECTOTCORR         MERRA-2 Precipitation Corrected (mm/day) 
PRECTOTCORR_SUM     MERRA-2 Precipitation Corrected Sum (mm) 
-END HEADER-
'''


def process_data(df, month, year):
    """
    Filters on the month or year and plots the selected parameter.

    Args:
        df (DataFrame): The full dataset as a DataFrame.
        parameter (str): The parameter to filter and plot (e.g., 'RH2M', 'T2M_MAX').
    """

    return 


