#!/usr/bin/env python3

import sys
import subprocess
import shutil

options = {
    ######## USER INPUT #########
    "sectionNr": False,
    "TOC": False,
    "TOC_depth": 2,
    "template": "webTemplate.md",
    "filters": ["webEquations.py"]
    #############################
}

def helpMessage():
    return ("""
  OVERVIEW:
  This tool helps to convert LaTeX (.tex) to Markdown (.md) files that can be included on a gatsby website. 

  DEPENDENCIES:
  This tool requires a working (and added to the path) installation 
  of pandoc:

    https://pandoc.org/installing.html

  To use the filter for equation numbering
  we need to have the following python packages installed (the 
  install command is a suggestion, conda, for example, comes with 
  these packages pre installed, they may be old though!).

  * pandocfilters (INSTALL: pip3 install pandocfilters)

  USAGE:
  To use the tool simply run this file with as input parameter the
  .tex file and optionally the name of the output file. On Linux
  
    ./texxToWeb.py <input>.tex
  
  or
  
    ./textToWeb.py <input>.tex <output>.md

  NB: for all the features to work the following files should be 
  accessible (preferably in the working directory) and .py files
  should be executable:

  * addEquationNumbers.py

  """)


def runPandoc(inputFile, outputFile="output.md"):
    global options

    #defaults
    args = ["pandoc", "--to=markdown", "--from=latex"]

    # Processing options
    if options["sectionNr"]:
        args.append("--number-offset=0")
    if options["TOC"]:
        args.append("--toc")
        if "TOC_depth" in options:
            args.append(f"--toc-depth={options['TOC_depth']}")
    if "pathToBib" in options:
        args.append(f"--bibliography={options['pathToBib']}")
    if "template" in options:
        args.append(f"--template={options['template']}")
    for filter in options["filters"]:
        args.append(f"--filter={filter}")

    args.append(f"--output={outputFile}")
    args.append(inputFile)
    # run pandocs
    print(f"Processing: {inputFile}")
    subprocess.Popen(args)
    print(f"MD is written to: {outputFile}")


if __name__ == "__main__":
    if (shutil.which("pandoc") == None):
        print("No pandoc installation found.")
        exit()

    userOptions = sys.argv

    if len(userOptions) == 1:
        print("Please specify at least an input file (.tex)")
        print("General usage: texToWeb.py <input>.tex <output>.md")
        print("For a help message use: texToWeb.py help")

    if len(userOptions) == 2:
        if userOptions[1][-4:] == ".tex":
            runPandoc(userOptions[1])
        elif userOptions[1].find("help") != -1:
            print(helpMessage())
        else:
            print("Only .tex files are supported.")

    if len(userOptions) == 3:
        if userOptions[1][-4:] == ".tex":
            runPandoc(userOptions[1], userOptions[2])
        elif userOptions[1][-3:] == ".md":
            runPandoc(userOptions[1], userOptions[2], markdown=True)
        else:
            print("Only .tex or .md files are supported.")
