---
title: Markdown Reference
date: "2020-07-23"
tags: [markdown, math, floats]
thumbnail: ./mdImage.png
description: A markdown reference cheat.
---

This markdown file is an extended version of the standard [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) often used as a reference, test and showcase. Hence presented here are mostly things markdown can do natively plus some extras, namely

* mathmode (based on KaTeX),
* floating figures and
* bibliographies.

## Automatic Table Of Contents in Markdown
To create this toc install the `gatsby-remark-table-of-contents` plugin, note that this plugin does not work if the `prismjs` plugin is defined befor the toc plugin in the `gatsby-config.js` file. The plugin needs the `gatsby-remark-autolink-headers` plugin to make the links in the toc work. After setting up the two plugins one can simply add

to the markdown file and it will automatically be replaced by the table of contents. Here we go:

## Math Mode

```no-highlight
Math support can be added to markdown via the `gatsby-remark-katex` plugin. 
Simply add `require(`katex/dist/katex.min.css`)` to your blog template after install and configuration of the plugin.
One can then simply type "Latex style" equations, i.e. `$x$` for inline and `$$` for display math environments.

examples:

inline: $a^2 + b^2 = c^2$ 

display math: $$\braket{\phi\vert\phi} = \int_0^\infty \psi(x,t) dx$$


```

Math support can be added to markdown via the `gatsby-remark-katex` plugin. 
Simply add `require("katex/dist/katex.min.css")` to your blog template after install and configuration of the plugin.
One can then simply type Latex "type" equations, i.e. `$x$` for inline and `$$` for display math environments.

examples:

We will just type some text to show what will happen if we use the inline version of KaTeX. Note that I added the following option `.katex { font-size: 1.4em !important; }` to the right css file to render equations and formulas larger than surrounding text, so lets give it a go, inline: $a^2 + b^2 = c^2$. Well I hope that looks pretty!

Now the display math environment (since version 0.12.0 of KaTeX we also have bra-ket support):

$$ 
\braket{\psi_1\vert\psi_2} = \int_{-\infty}^\infty \psi_1^*\psi_2 dx  \tag{1}
$$

That is all there is to it.

#### Equation Numbers
At the moment KaTeX only supports manually labelling equations with the `\tag` command.

## Images Normal and Floating
Markdown is very bad at handling figures so we use our own `html` environment, which makes everything rather easy.

```
This is just an image

<div class="md-image" style="float:center;max-width:500px;min-width:300px">
    <img src="../assets/water.jpg"/>
    An image.
    <hr-fig/>
</div>

#### Floating Figures
<div class="md-image" style="float:right;max-width:500px;min-width:300px">
    <img src="../assets/water.jpg"/>
    Now this figure is a float.
    <hr-fig/>
</div>
```
`hr-fig`  and `md-image` are defined in a css file:

```
hr-fig {
    position: relative;
    display: block;
    align-content: center;
    text-align:center;
    width: 60%;
    margin: auto;
    margin-top: -0.2em;
    padding: 0;
    height: 0.01rem;
    border: 0;
    border-top: 0.01rem solid $dark-border;
    @include light-mode {
      border-top: solid 0.01rem $light-border;
    }
}

.md-image {
  padding: 5px 5px 5px 5px;
  font-size: 0.8em;
  align-content: center;
  text-align: center;
  display: block;
}
```
Now let's see what happens:

This is just an image

<div class="md-image" style="float:center;max-width:500px;min-width:300px">
    <img src="../assets/water.jpg"/>
    An image.
    <hr-fig/>
</div>

#### Floating Figures
<div class="md-image" style="float:right;max-width:500px;min-width:300px">
    <img src="../assets/water.jpg"/>
    Now this figure is a float.
    <hr-fig/>
</div>
Now we also present a floating version. I find it very ugly if my floating figures overlap (vertically) with one of the larger headings. To prevent overlap with headings 1 and 2 I added `clear:both;` to their css classes. An example:

```
h1 {
    margin: 0 0 0.3em 0;
    font-size: 3.5rem;
    font-weight: 700;
    clear:both;
}
```

Mauris tristique nec velit sed egestas. Nam vel libero orci. Morbi placerat turpis eu sem viverra mollis. Nulla ultrices tortor sed dolor molestie, tristique eleifend nisi tincidunt. Morbi gravida et ipsum non blandit. Pellentesque eu felis condimentum, pharetra nisi id, gravida odio. Cras eleifend sed nulla sed aliquam. Nulla aliquet sit amet dui id sollicitudin. 



## Headers 

```no-highlight
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------
```

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

Alternatively, for H1 and H2, an underline-ish style:

# Alt-H1

## Alt-H2

## Emphasis

```no-highlight
Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~
```

Emphasis, aka italics, with _asterisks_ or _underscores_.

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

## Lists 

```no-highlight
1. First ordered list item
2. Another item
  * Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
  1. Ordered sub-list
4. And another item.

   Some text that should be aligned with the above item.

* Unordered list can use asterisks
- Or minuses
+ Or pluses
```

1. First ordered list item

2. Another item

   - Unordered sub-list.

3. Actual numbers don't matter, just that it's a number

   1. Ordered sub-list

4. And another item.

   Some text that should be aligned with the above item.

- Unordered list can use asterisks

- Or minuses

- Or pluses

## Links

There are two ways to create links.

```no-highlight
[I'm an inline-style link](https://www.google.com)

Or leave it empty and use the [link text itself]
```

[I'm an inline-style link](https://www.google.com)

Or leave it empty and use the [link text itself]

Fully qualified URLs will automatically be turned into links.
http://www.example.com

## Code and Syntax Highlighting

Code blocks are part of the Markdown spec, but syntax highlighting isn't. However, many renderers -- like Github's and _Markdown Here_ -- support syntax highlighting. _Markdown Here_ supports highlighting for dozens of languages (and not-really-languages, like diffs and HTTP headers); to see the complete list, and how to write the language names, see the [highlight.js demo page](http://softwaremaniacs.org/media/soft/highlight/test.html).

```no-highlight
Inline `code` has `back-ticks around` it.
```

Inline `code` has `back-ticks around` it.

Again, to see what languages are available for highlighting, and how to write those language names, see the [highlight.js demo page](http://softwaremaniacs.org/media/soft/highlight/test.html).

# Tables

Tables aren't part of the core Markdown spec, but they are part of GFM and _Markdown Here_ supports them. They are an easy way of adding tables to your email -- a task that would otherwise require copy-pasting from another application.

```no-highlight
Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3
```

Colons can be used to align columns.

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |

## Blockquotes

```no-highlight
> Blockquotes are very handy in email to emulate reply text.
>> Blockquote in blockquote
>> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.
```

> Blockquotes are very handy in email to emulate reply text.
>> Blockquote in blockquote
>> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can _put_ **Markdown** into a blockquote.

## Inline HTML

You can also use raw HTML in your Markdown, and it'll mostly work pretty well.

```no-highlight
<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>
```

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

## Horizontal Rule

```
Three or more...

---

Hyphens

***

Asterisks

___

Underscores
```

Three or more...

------

Hyphens

------

Asterisks

------

Underscores

## Line Breaks

My basic recommendation for learning how line breaks work is to experiment and discover -- hit &lt;Enter&gt; once (i.e., insert one newline), then hit it twice (i.e., insert two newlines), see what happens. You'll soon learn to get what you want. "Markdown Toggle" is your friend.

Here are some things to try out:

```
Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the *same paragraph*.
```

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a _separate paragraph_.

This line is also begins a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the _same paragraph_.

(Technical note: _Markdown Here_ uses GFM line breaks, so there's no need to use MD's two-space line breaks.)

------

## Code Highlighting

```javascript
    // In your gatsby-config.js
    // Let's make this line very long so that our container has to scroll its overflow…
    plugins: [
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 756,
              },
            },
            {
              resolve: `gatsby-remark-responsive-iframe`,
              options: {
                wrapperStyle: `margin-bottom: 1.0725rem`,
              },
            },
            `gatsby-remark-copy-linked-files`,
            `gatsby-remark-smartypants`,
            `gatsby-remark-prismjs`,
          ]
        }
      }
    ]
```

Let's do something crazy and add a list with another code example:

- **A list item**

  …and a paragraph! In my younger and more vulnerable years my father gave me
  some advice that I’ve been turning over in my mind ever since.

  1. A nested numbered list
  2. “Whenever you feel like criticizing any one,” he told me, “just remember
     that all the people in this world haven’t had the advantages that you’ve
     had.”

- Roger that, now back to topic: _Highlighted code blocks work here, too:_

  ```css{10,13}
  .clearfix:after {
  	visibility: hidden;
  	display: block;
  	font-size: 0;
  	content: " ";
  	clear: both;
  	height: 0;
  	}
  .clearfix { display: inline-table; }
  /* Hides from IE-mac \*/
  * html .clearfix { height: 1%; }
  .clearfix { display: block; }
  /* End hide from IE-mac */
  ```

  Wow, "IE-mac"?
  [Yeah, that was a thing](https://en.wikipedia.org/wiki/Internet_Explorer_for_Mac)
  back in the day … a good one at the time, too:

  > Initial versions were developed from the same code base as Internet Explorer
  > for Windows. Later versions diverged, particularly with the release of
  > version 5 which included the cutting edge,
  > [fault-tolerant](https://en.wikipedia.org/wiki/Fault-tolerant) and highly
  > standards-compliant
  > [Tasman](<https://en.wikipedia.org/wiki/Tasman_(layout_engine)>) >
  > [layout engine](https://en.wikipedia.org/wiki/Layout_engine).

  Source: https://en.wikipedia.org/wiki/Internet_Explorer_for_Mac

- **The last list item** –- no more list items after this one, pinky swear!

# Bibliography
There is a great plugin for bibliographies in gatsby, [gatsby-remark-bibliography](https://github.com/ptigas/gatsby-remark-bibliography). Install it and add it to the site configuration and you can use it like this `\cite{gregor2015draw}` \cite{gregor2015draw}.

To add the bibliography itself just make a html tag for it.

```html
<bibliography>
@article{gregor2015draw,
    title={DRAW: A recurrent neural network for image generation},
    author={Gregor, Karol and Danihelka, Ivo and Graves, Alex and Rezende, Danilo Jimenez and Wierstra, Daan},
    journal={arXivreprint arXiv:1502.04623},
    year={2015},
    url={https://arxiv.org/pdf/1502.04623.pdf},
}
</bibliography>
```

---

<bibliography>
@article{gregor2015draw,
    title={DRAW: A recurrent neural network for image generation},
    author={Gregor, Karol and Danihelka, Ivo and Graves, Alex and Rezende, Danilo Jimenez and Wierstra, Daan},
    journal={arXivreprint arXiv:1502.04623},
    year={2015},
    url={https://arxiv.org/pdf/1502.04623.pdf},
}
</bibliography>

---
