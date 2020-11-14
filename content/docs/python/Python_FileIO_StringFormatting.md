---
title: File IO and String Formatting
tags: [python, fileIO]
description: Basic FileIO with python
thumbnail: ../dummy.png
---

# File IO
To start we need a file, copy paste the following into a file called `input.txt` that you save in the same folder as your python script.

```text
Some comment that is not very useful
temperature: 20 
distance: 100
coordinates 1 2 3.0
```

## Reading
To read a file we need to open it in read mode this is done with the `"r"` in a `with open ...` statement

```python
with open("input.txt", "r") as inputFile:
  line = inputFile.readline() # this reads the first line
  print (line)
  for line in inputFile: # this reads the rest of the lines
    print(line)
```
 At this point the variable `line` still contains the last line. To extract information from that line we can use the `split()` function

```python
splittedLine = line.split() # check your variable explorer to see what's in splittedLine
xCoord = float(splittedLine[1])
yCoord = float(splittedLine[2])
zCoord = float(splittedLine[3])
```

To convert the text input to a number we need to use the `float()` function, if you want to convert text to an integer use `int()`.

Suppose now that we want to store the whole file, we could run

```python
storage = [] # create an empty list
with open("input.txt", "r") as inputFile:
  for line in inputFile: 
    storage.append(line) # append every line to the list
```

use your variable explorer to see what has happened. 

## f-strings (formatting your output)
f-strings are a very nice python feature, they allow you to print the value of variables inside strings. An f-string is just a normal string with an f in front of it, an example

```python
pi = 3.141592653589793
integer = 5
print(f"pi has a value of {pi}")
print(f"pi has a value of {pi:10.5f}")
print(f"integer width 10: {integer:10d}")
```

The first print statement should be clear on its own, in the second print statement we added `:10.5f` this indicates that the number should be printed in a field that is 10 characters wide, should contain 5 decimal places after the dot and is a float (`f`), for an integer use the letter `d`.


## Writing
To write to a file we open the file in write `"w"` mode

```python
with open("output.txt", "w") as outputFile:
  for data in ["bicycle", "koala", [1,2,3], 4, 5.0]: 
    outputFile.write(f"here is the data: {data}\n")
```

Have a look at the `output.txt` to see what it did exactly. Note that if we write to a file we should specify where an "enter" should be placed, this is done with the new line symbol `\n`.