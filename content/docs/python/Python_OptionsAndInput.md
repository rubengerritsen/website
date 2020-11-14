---
title: Options Parsing
tags: [xml, python, optionparsing]
description: Options parsing with python
thumbnail: ../dummy.png
---

# Options Parsing
There might be a moment during this course in which you would like to specify options for your program. For example you might want to pass the temperature or some other parameters. There are many ways to do this, one of the easiest is just typing the parameters in your python code, but this is risky. The main problem is that if you run multiple simulations and change the parameters every time, it becomes hard to keep track of which simulations were run with which parameters. This is particularly annoying if a simulation takes multiple hours. 

There are multiple solutions to this problem but an easy one is specifying options in an option file and save that option file with your simulation results. Here we will present an easy way to parse options via xml files.
 
## XML files
XML files are files where you can store values (elements) with a name (tag) and attributes. Let's look at an example file

```xml
<options>
    <mode help="can be: growseason, specificmoment, monthly or hourly">monthly</mode>
    <outputPath>../output</outputPath>
    <latitude>51.9269</latitude>
    <longitude>6.5697</longitude>
    <timezone>2.0</timezone>
</options>
```
An XML file consists of three things

* Opening and closing tags: they are the parts between the angular brackets, this `<options>` is an opening tag named options and this `</options>` is a closing tag.
* Attributes: these are key-value pairs, in the example above there is only one, a help message. The key is `help` and the value is `"can be: growseason, specificmoment, monthly or hourly"`. Note that attributes are written inside the opening tag.
* Elements: the part between an opening and closing tag. Examples in the above file are `monthly`, `../output` and `51.9269`.

The combination of tags and elements allows us to get options by name from the
xml file. What follows is some example code of how you would read from the XML
file above (I saved the xml file as `example.xml`). 

```python
import xml.etree.ElementTree as ET

# read the xml file
tree = ET.parse('example.xml')

# get the contents of the outermost tag,
# in this case everything between <options> and </options>
options = tree.getroot() 

print(options.find("mode").text) # .text gets the contents of the element
print(options.find("latitude").text)
# note that we always read a string, so we have to convert to a 
# number if we want to do computations
lon = float(options.find("longitude").text) 
print(2 *lon)
```
You can do much more with xml files, but for simple option parsing this should be more than sufficient.


