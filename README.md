# cerealKillers <!-- belkebirI_fabihaT_ngR_rachlevskyM -->

Imad Belkebir (PM), Tabassum Fabiha, Rachel Ng, Mai Rachlevsky


## [Gun Violence Data](https://www.kaggle.com/jameslko/gun-violence-data)
<!-- Description of data set(s). Source (brief description + hyperlink) -->

Record of over 240k gun violence incidents from 2013 to 2018

We've parsed the data so it counts in terms of states per month rather than by individual incidents.  
<sup>~~We'll be parsing the data later because it's 150 mb, but you can [download it here](https://www.kaggle.com/jameslko/gun-violence-data) and add it to your data folder in the repo.~~</sup>

### Relevance / Significance

Gun violence is becoming a more prevalent issue in the US, including school shootings.

### [2014 - 2018 State Population Estimates](https://www.census.gov/newsroom/press-kits/2018/pop-estimates-national-state.html)

Population estimates for each state made by the US Census Bureau from 2014-2018. 

The data has been parsed to remove data for other years, and will be used to determine the number of people shot in proportion to the (estimated) population of the state.

## Visualization of Data and User Interaction

<!-- Explanation, in broad strokes if necessary, of how you aim to make this data come alive. What will be shown, absent user interaction? -->

A time lapse of gun violence incidents by state will be shown with the colors transitioning to suit the data for each month

<!-- How will user interact with your visualization? -->

Users can choose the type of frequency they want to depict the choropleth by such as if it represent frequency of incidents, injuries, or deaths with buttons or a dropdown menu. 

Upon hovering over each state the user will be presented statistics of gun violence from that state.

### Questions Explored
<!-- What questions will your visualization allow user to explore? What questions will it provoke? -->

- What are areas of mass gun violence?
- What makes these areas different from areas where gun violence is less common?
- Is the area I’m living in or planning to live in relatively safe from gun violence?
- How many people survive gun violence? 
- How frequently does gun violence occur? 
- How has gun violence changed over time? 
- What impacts gun violence and its frequency? 


## D3 Utilization 
<!-- Explanation of D3 feature utilization: -->

### Enter / Exit Selections <!-- enter/exit selections? -->

As we transition from one month to the next we will enter data from the next month while exiting data from the previous month to show a transition of time in our graph.

### Transitions <!-- transitions? -->

There will be a period from one month to the next in which the colors transition to suit the data for the new month.

### Responsiveness and User Interaction 
When hovering over a state the user will be presented exact information on how many injuries/deaths were caused, how many incidents occurred, and how many incidents were cases with legal/stolen guns.

<img src="https://github.com/ibelkebeer/cerealKillers/blob/master/doc/map_hover.gif?raw=true">
<sup><a href="https://vida.io/documents/4vZ9mRGyepoyQxFcK">Example of choropleth with hover</a></sup>

## References [(D3 Gallery)](github.com/d3/d3/wiki/Gallery)
<!-- similarity to gallery (http://www.github.com/d3/d3/wiki/Gallery) examples? Which and how? -->
<!-- Sketch/mock-up/screenshot of your envisioned visualization. -->

### [Time Lapse](http://www.brightpointinc.com/united-states-trade-deficit/)

The graph will depict a time lapse of gun violence incidents from 2013 to 2018.

<img src="https://github.com/ibelkebeer/cerealKillers/blob/master/doc/timelapse.gif?raw=true">

### [Choropleth](https://observablehq.com/@d3/choropleth)

We will show a choropleth map similar to this one showing frequency of deaths/injuries/incidents per state per month.

<img src="https://github.com/ibelkebeer/cerealKillers/blob/master/doc/choropleth.png?raw=true">

## Mock-up

<img src="https://github.com/ibelkebeer/cerealKillers/blob/master/doc/map.png?raw=true">

## Launch Codes


1. Clone this repository into your folder of choice
    ```
    $ git clone git@github.com:ibelkebeer/cerealKillers.git
    ```
    
2. Move to the root directory of this repository in terminal
    ```
    $ cd cerealKillers
    ```
    
3. Activate your virtual environment
    ```
    $ python3 -m venv venv
    $ . path/to/venv/bin/activate
    ```
    
4. Upgrade pip and install the dependencies using `requirements.txt`
    ```
    (venv) $ pip install --upgrade pip
    (venv) $ pip install -r requirements.txt
    ```

5. Run the python file (starting the Flask server)
    ```
    (venv) $ python app.py
    ```
    
6. Open one of the following in your browser
    ```
    http://127.0.0.1:5000/
    http://localhost:5000/
    ```
