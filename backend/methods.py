import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import pandas as pd
import glob
import os

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


def clear_old_plots(static_dir):
    files = glob.glob(os.path.join(static_dir, '*.png'))
    for f in files:
        os.remove(f)

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

def round_coord(x):
    if x % 1 < 0.25:
        return int(x) + 0.25
    elif x % 1 < 0.75:
        return int(x) + 0.75
    else:
        return int(x) + 1.25

def process_data(df, lon, lat, year, param=None,):
    """
    Filters on the month or year and plots the selected parameter.

    Args:
        df (DataFrame): The full dataset as a DataFrame.
        lon (float): The longitude to filter by.
        lat (float): The latitude to filter by.
        year (int, optional): The year to filter by.
    """

    try:
        lon = float(lon)
        lat = float(lat)
        year = int(year)
    except ValueError:
        print("Invalid data types for latitude, longitude, or year.")
        return None
    
    lon = round_coord(lon)
    lat = round_coord(lat)

    print(lat)
    print(lon)

    # Filter the data based on the user-provided latitude and longitude
    filtered_df = df[(df['LAT'] == float(lat)) & (df['LON'] == float(lon))]

    # Filter the data based on the user-provided year if provided
    if year:
        filtered_df = filtered_df[filtered_df['YEAR'] == year]

    # Months to be used as labels
    months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    params = ['RH2M', 'T2M_MAX', 'PRECTOTCORR', 'PRECTOTCORR_SUM']

    print(param)

    if param:
        params = [param]

    plt.figure()
    # Flattening the data for scatter plot
    for param_iter in params:
        cur_df = filtered_df[filtered_df["PARAMETER"] == param_iter]
        y_values = []
        x_values = []
        for month in months:
            y_values += [month] * len(cur_df)
            x_values += cur_df[month].tolist()
            
        plt.plot(y_values, x_values, label=param_iter)

        plt.legend()

    print(filtered_df)

    plt.xlabel('Month')
    plt.ylabel('Value')
    plt.title('Monthly Data')
    plt.legend()
    plt.grid(True)

    # Ensure the static directory exists
    static_dir = os.path.join(os.path.dirname(__file__), 'static')
    os.makedirs(static_dir, exist_ok=True)

     # Clear old plots
    clear_old_plots(static_dir)

    # Save the plot as an image file
    print(param)
    
    plot_filename = f'{param}_plot.png'
    print(plot_filename)
    plot_path = os.path.join(static_dir, plot_filename)
    plt.savefig(plot_path, bbox_inches='tight')
    plt.close()

    return plot_filename


    # # Return the path to the plot
    # return base64.b64encode(img.getvalue()).decode()
