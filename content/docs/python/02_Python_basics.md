---
title: Basic Python, Lists, Strings, Math, Controlstatements and Functions
tags: [python, basics, programming]
description: A minimal overview of the basic python features.
thumbnail: ../dummy.png
---



# Introduction
This is the first of our python tutorials on Canvas for 2MMN40. These tutorials are not meant as a complete reference. What they will give you is a quick overview of almost everything you need from python for this course. They should save you some time googling. You probably still need to google some details after these tutorials, but at least you know what to google for. Furthermore, if you work through this basic tutorial and our NumPy tutorial you will have seen all data structures that you might need in the course. 

As with any other programming tutorial the quickest way of learning is doing. Open spyder and simply try out every example. It is even better if you already try to change and modify the examples to see how far you can stretch the use of some commands.

> Tip: The quickest way to test a few commands or a function is to type them in the interactive python console of spyder, for small pieces of code you do not need the text editor.


# Basic Python

## Lists
The basic building block in python is the `list`. Lists are collections of data. Lets create a list of numbers called `lst`:

> Notation: I will prepend `>>>` to all the lines of code you could type into the console. The line after it will be output. If you encounter a code block without any `>>>` you should copy paste it in the text editor and press play.

```python
>>> lst = [1,2,3,4,5,6,7]
```

We can access elements in a list with an index between square brackets, `lst[3]` for example will return 4. Note that **indexing starts at zero!**

We can also get a part of a list with the colon `[begin:end]`, this will give us all numbers from the begin index up to *but not including* the end index, an example: 

```python
>>> lst[2:6] 
[3,4,5,6]
>>> lst[-2:-1] # negative indices start at the end of a list
[6]
>>> lst[2:] # leaving the "end" part empty goes to the end of the list
[3,4,5,6,7]
```
Lists can also be added,
```python
>>> lst2 = [8,9]
>>> lst + lst2
[1,2,3,4,5,6,7,8,9]
```

lists have a length
```python
>>> len(lst)
7
```

and we can append to a list.
```python
>>> lst.append("fiets")
>>> lst
[1, 2, 3, 4, 5, 6, 7, 'fiets']
```
Note that we can mix types (i.e strings and integers in this case).

### Other "Lists"
Most things behave like lists in python, as an example consider the following string and the following operations:
```python
# there is no distinction between ' and " in python
>>> text = "python crash" + ' course' 
>>> len(text)
19
>>> text[-6:]
'course'
```
Hence strings and lists can be used in the same way. A list also doesn't have to contain numbers it can contain all kind of things. We can print the items in a list one by one in a for-loop.
```python
things = [1, 2, 'a', 'bicycle', 4]

for item in things:
  print(item)
print("done")
```
To make python understand which parts of the code are part of the for-loop we use indentation, everything with the same indentation level is part of that for-loop.

> The reason almost all python objects behave like lists is that they all follow the same data model. If you really like to know the details of python you can check out the data model [here](https://docs.python.org/3/reference/datamodel.html). Note however that the documentation might be a bit overwhelming if you are relatively new to programming.

## Dictionaries
Python has another very useful and basic data structure, the so called dictionary. A dictionary is a map from strings to elements. The elements can be anything, strings, floats, integers, objects etc. A dictionary is enclosed in curly braces, an example 
```python
massDict = {'H': 1.0080, 'O': 15.9994, 'C': 12.0110}.
```
We can use the dictionary `massDict['H']` and it will give us the mass of the hydrogen molecule, i.e. `massDict['H'] == 1.0080`. Another (cliche) example is that of a phonebook
```python
phonebook = {'TU/e': "040 247 9111", 'Alice' : "0621212121"}
```
if we want the TU/e number we can simply type `phonebook['TU/e']`.

> For those of you who like computer science: a python dictionary is simply a hash table.

### Adding elements to a dictionary
Adding elements is as simple as `massDict['N'] = 14.0067`. The `massDict` now containts `{'H': 1.008, 'O': 15.9994, 'C': 12.011, 'N': 14.0067}`.



## Basic Math
All math operators behave as expected `+` will add things, `*` will multiply things etc., but `^` is reserved for bitwise `XOR`, if we want 2 to the power of 2 we need to do `2 ** 2`. 

```python
>>> 2 ** 2
4
>>> 3 + 4 - 2
5
>>> (3 **2 + 4 ** 2) ** (1/2)
5.0
>>> listOfNumbers = [1,2,3]
>>> sum(listOfNumbers)
6
```
## Control Statements
Python has all normal control statements, `if`, `for` and `while`. The control statments all have the same form, it is the name of the control statement followed by some condition and then a colon (`name condition:`), every bit of code that is part of a block in the control statement should be indented. Note that I like to use two spaces for indentation, the python standard is four.

### if statement

```python
number = 4
if number < 0:
  print("smaller than zero")
elif number == 0: # else if = elif in python
  print("number equals zero")
else:
  print("number is larger than zero")
```

### for loop
```python
for i in [0,1,2,3,4]:
  j = i ** 2
  print(j)
print("no longer part of the for-loop")
```

### for loop with range
Instead of writing out the list we want to iterate over, there is a shortcut, the `range()` function, run it and see if the output is what you expected. You should note something "strange" about the range function!
```python
for i in range(5):
  j = i ** 2
  print(j)
print("no longer part of the for-loop")
```
A bit more on the range function, try to run
```python
for i in range(4, 7):
  print(i)

# and run the next few lines in the interactive console
>>> range(3,10)
>>> list(range(3,10))
```
Note how range behaves the same as the indexing for lists, i.e. `[begin:end]`.

### while statement
```python
i = 0
while i < 10:
  print(i)
  i = i + 1
```

## Functions
Defining functions in python is straightforward
```python
def square(x):
  square = x * x
  return square

square(3)
```
once again everything that has the same indentation level is part of the function.

### Different argument types
Python functions can have two types of arguments. There are "normal" (positional) arguments and so called keyword arguments (often abbreviated to kwargs). Normal arguments depend on their position between the parantheses, keyword arguments depend on their name and can be used to define defaults. An example

```python
def isApproxEqual(a, b, error = 1e-2):
  return abs(a-b) < error

# now error has a default value of 1e-2
# we can use the function without specifying it
>>> isApproxEqual(1.0, 1.001)
# or overwrite the default value either positional or with it's name
>>> isApproxEqual(1.0, 1.001, 1e-5)
>>> isApproxEqual(1.0, 1.001, error=1e-5)
# These two statements are equivalent, but the latter is preferred
# because it is easier to read/understand.
```
Another example, now to show how the kwargs depend on there name.

```python
def keywordArguments(x =1, y=2, z=3):
  print(f"x: {x}")
  print(f"y: {y}")
  print(f"z: {z}")

keywordArguments()
keywordArguments(z=50)
keywordArguments(y=8, z=7, x=9)
```
If you want to mix positional and keyword arguments you need to provide all positional arguments before any keyword arguments. Doing otherwise will result in an error in the interpreter. 

### Multiple return values
In most programming languages it is not possible (or not allowed) to return multiple return values. In python, however, it is allowed and done fairly often. What you do is return a *tuple* and you need to *unpack* that tuple if you want to access its separate values. In its simplest form:

```python
def iReturnMultipleThings():
  """returns an int, string and list, all at the same time. """
  # a tuple is a comma seperated list surrounded by 
  # parantheses (e.g. (.., .., ..))
  return(3, "fiets", [1,2,3])

# "unpacking" is done with a comma seperated list of variables
# that is as long as the tuple
number, text, lst = iReturnMultipleThings()
print(number)
print(text)
print(lst)
```

