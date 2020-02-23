---
path: "/blog/automating-metagoofil-with-python"
date: "2019-02-07"
title: "Automating Metagoofil with Python"
tags: ["software"]
---

I recently needed to automate [metagoofil](http://www.edge-security.com/metagoofil.php) searches using Python, and thought I'd share the "proof of concept" script that got it working. I'll apologize ahead of time for any errors--I'm still only just beginning to learn Python.

Why automate metagoofil? Well, once you have your hands the type of files and metadata metagoofil brings back, there's a myriad of things you could dive into.

- [Extract text from the resulting PDFs](https://gist.github.com/jmcarp/7105045)
- Manipulate the [.docx files](https://python-docx.readthedocs.io/en/latest/user/documents.html)
- Use [https://api.mongodb.com/python/current/](https://api.mongodb.com/python/current/) to record metadata into MongoDB
- Use [scikit-learn](https://machinelearningmastery.com/prepare-text-data-machine-learning-scikit-learn/) to perform some advanced text processing

I already have some pretty specific ideas for how I can use this short automation script, but I'll save those for late. There's quite a bit to share.

<hr />

Ok, here's the code.

**The Script**

```python
from subprocess import Popen, PIPE
import pprint

printer = pprint.PrettyPrinter(indent = 4)

res = Popen([ "python", "~/metagoofil.py", "-d", "some-domain.com", "-t", "doc,pdf", "-l", "200", "-n", "100", "-o", "/your/files/here", "-f", "results.html"], stdout = PIPE)
printer.pprint(res.communicate()[0])

while res.poll() is None:
    time.sleep(0.5)

printer.pprint("completed metagoofil run")
```

**Some Notes**

I'm specifically using `Popen` so that I can easily use `.communicate()`  to easily grab the data being sent to stdout. Also, with parameters being an array of strings, that proves to be an easy mechanism to manipulate when calling this script from others languages/tools (i.e. JavaScript).

```python
res = Popen(["params", "array", "of", "strings"], stdout = PIPE)
printer.pprint(res.communicate()[0])
```

This is a naive (yet, effective) mechanism for blocking until the process is completed. It checks every 0.5 seconds to see if the process is finished. BEWARE! If you are using this...and your process *never finishes*...this won't finish either! Hence, *naive*. :)

```python
while res.poll() is None:
    time.sleep(0.5)
```

**References**

- Metagoofil tool [http://www.edge-security.com/metagoofil.php](http://www.edge-security.com/metagoofil.php)

- Extract text with Python + pdfminer-six [https://gist.github.com/jmcarp/7105045](https://gist.github.com/jmcarp/7105045)

- Work with .docx files [https://python-docx.readthedocs.io/en/latest/user/documents.html](https://python-docx.readthedocs.io/en/latest/user/documents.html)

- Textual processing with Python + scikit-learn [https://machinelearningmastery.com/prepare-text-data-machine-learning-scikit-learn/](https://machinelearningmastery.com/prepare-text-data-machine-learning-scikit-learn/)