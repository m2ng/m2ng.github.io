---
layout: post
title: "Python skills every responsible data scientist should know"
categories: python
---

The use of Python is prevalent in the data science field because of its expressiveness and huge community support on data-related tasks. Python is usually seen as the tool just to get things done. When data scientists are trying to develop a Python module for automating data-related tasks, they tend to apply what they used to be doing with the notebook to the Python module.

For most of the time, you can always find production code defining complicated functions without comments explaining what the functions are doing. Sometimes, you even need to do extra work to make the production code work in your machine.

Many of these problems are not fatal. The reality is that usually a codebase is not maintained or used by a single person. If we are developing a codebase that is supposed to be re-used by some other people in the team, it is our responsibility to make the code *maintainable* and *portable*.

By maintainable, it means that someone who has not worked with the codebase before should be able to understand what the functions inside the codebase are doing very quickly. By portable, it means that someone can easily import or re-use the code without doing extra and tedious configurations to make the code work.

Here are my top 4 suggestions to make your code more maintainable and portable:

### 1. Annotate and document your code with meaningful explanations

Here is an example why commenting your code is important:
```python
def get_vol(x, y):
    ...
```

Without someone telling you what the context is, you should basically have no idea whether the word "vol" in the function name refers to "volume" or "volatility".

So, tell other users what the code is doing by adding comments and using meaningful variable names:
```python
from typing import int, bool

def get_naruto_volume(volume_number: int,
                      is_shippuden: bool,
                      *args,
                      **kwargs) -> str:
    """
    Return the local path to the Naruto volume.
    
    Parameters
    ----------
    volume_number : int
        The volume number. Starts from 1.
    is_shippuden : bool
        Return Naruto Shippuden (Part II) volume.
    *args, **kwargs
        Additional arguments and keywords (For compatibility)
    """
    ...
```

Comment your code in such a way that a newbie will understand. Sometimes, if the outputs of some of the functions you defined are predictable, specify them in the comment as well.

```python
import numpy as np

def rmse(true: np.ndarray, pred: np.ndarray) -> np.float64:
    """
    Return the square root of mean-squared error of `true` and `pred`.

    Parameters
    ----------
    true: np.ndarray
        Expected output in NumPy array.
    pred: np.ndarray
        Predicted output in NumPy array.
    
    Returns
    -------
    scalar
        The root mean-squared error.

    Examples
    --------
    >>> a = np.array([1., 2., 3.])
    >>> b = np.array([-1., -2., -3.])
    >>> rmse(a, b)
    4.320493798938574
    """

    return np.sqrt(np.power(true - pred, 2.).mean())
```

The advantage of listing examples in this format is that the lines starting with `>>>` can be recognized by [doctest](https://docs.python.org/3/library/doctest.html), which is a built-in Python module for testing whether functions provide outputs stated in function [docstrings](https://en.wikipedia.org/wiki/Docstring).

### 2. Make a unique virtual environment for every single project
Unless projects share the example same configurations and dependencies, consider setting up a unique virtual environment for every single project.

I strongly recommend using [Pipenv](https://pipenv.pypa.io/en/latest/) because it allows one to specify the module dependencies, Python version and many other things in the desired virtual environment in a configuration file. Dependency lock is also supported to protect other users from packages tampered by a third party.

Install Pipenv in your user install directory by running `python -m pip install --user pipenv`. Then, run `pipenv shell` in your project root directory will get you into the virtual environment.

In some circumstances, you may want to have the virtual environment sitting inside your project root directory. You may export an environment variable `PIPENV_VENV_IN_PROJECT=1` and then run `pipenv shell` in the location you want the virtual environment to be.

### 3. Make your package portable
```python
import sys
sys.path.insert(1, '/opt/packages')

import generic_data_wrangler as gdw
```
This example demonstrates a common pattern of importing a package in a lot of data science codebase. In production environments, especially in those writes to the default site-packages folder are forbidden, this pattern can come in pretty handy for someone to test whether a package works or not as intended.

However, this pattern generally leads to unmaintainable and non-portable code especially when there are multiple nodes with different Python versions and CPU architectures if the package is to be shared across these nodes. Besides, you are solely responsible for managing the dependency conflicts.

Consider wrapping your Python module with a parent folder with the same name:
```python
generic_data_wrangler/
+-- static_assets
+-- src/
|   +-- generic_data_wrangler/          # The actual Python package you write
|       +-- __init__.py
|       +-- wranglers.py
|       +-- base.py
|       ...
+-- setup.py                            # An important file to make your Python
                                        # package installable
```

There are so many [different ways](https://docs.python.org/3/distutils/setupscript.html) of defining the `setup.py`. Here is one example:
```python
from distutils.core import setup

setup(name='Generic Data Wrangler',
      version='1.0',
      description='As the name suggests, it is for wrangling different types of data',
      author='Foo Bar',
      packages=['generic_data_wrangler'],
      package_dir={'generic_data_wrangler': 'src/generic_data_wrangler'},
      package_data={'generic_data_wrangler': ['static_assets/**/*.yaml']})
```

So, if someone is working with a virtual environment and copies the entire folder at which the root consists of the `setup.py` to somewhere, the package can be installed to the virtual environment by running `python setup.py install` at the location where the `setup.py` is in.

### 4. Store your intermediate tabular results in a portable database
There is nothing wrong to store a table in a CSV file if the table is small. However, if the table is big (e.g. a set of metrics with more than 10000 rows and 100 columns), I suggest that you should store the table in a portable database like what SQLite offers.

SQLite is fast and lightweight. Not only that, SQLite is also battle-tested and is ACID-compliant. One common use case of SQLite is storing tabular data in a small application. By default, SQLite 3 support is baked into a Python 2.5+ distribution. Try to run `import sqlite3` in your Python interpreter to see if it works or not.

I have run an experiment to show you how storing a pandas DataFrame in a SQLite database is faster and more space-efficient than saving it to a CSV file.

```python
"""
store_your_intermediate_results_in_sqlite.py
"""
import sqlite3
import pandas as pd
import numpy as np
import os
from time import time
from faker import Faker


def get_sample_data(n_row, n_col):
    f = Faker()
    names = pd.DataFrame({'name': [f.name() for _ in range(n_row)]})
    values = pd.DataFrame(np.random.random((n_row, n_col)),
                          columns=[f'v{i}' for i in range(1, n_col+1)])
    return pd.concat((names, values), axis=1)


def test_save_to_sqlite_db(df):
    try:
        os.remove('./test.db')
    except FileNotFoundError:
        pass
    finally:
        with sqlite3.connect('./test.db') as conn:
            df.to_sql('test', conn)


def test_save_to_csv(df):
    try:
        os.remove('./test.csv')
    except FileNotFoundError:
        pass
    finally:
        df.to_csv('./test.csv')


trials = list(product([1000, 5000, 10000], [10, 50, 100], ['sqlite', 'csv']))
results = pd.DataFrame(trials, columns=['n_row', 'n_col', 'method'])
results[['size', 'time']] = 0
results.set_index(['n_row', 'n_col', 'method'], inplace=True)

d = get_sample_data(results.index.get_level_values('n_row').max(),
                    results.index.get_level_values('n_col').max())

methods = {
    'sqlite': test_save_to_sqlite_db,
    'csv': test_save_to_csv
}

file_ext = {
    'sqlite': 'db',
    'csv': 'csv'
}

for n_row, n_col, method in trials:
    fn = methods[method] 
    start = time()
    for _ in range(50):
        fn(d.iloc[:n_row, :n_col+1])
    results.loc[n_row, n_col, method].loc['time'] = (time() - start) / 50
    results.loc[n_row, n_col, method].loc['size'] = os.path.getsize(f"test.{file_ext[method]}")

results['size'] = results['size'].astype(int)
results.rename(columns={'size': 'size (bytes)', 'time': 'average elapsed time (seconds)' }, inplace=True)

```

The summary of the simulated trials is as follows:
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th colspan="2" halign="left">size (bytes)</th>
      <th colspan="2" halign="left">average elapsed time (seconds)</th>
    </tr>
    <tr>
      <th></th>
      <th>method</th>
      <th>csv</th>
      <th>sqlite</th>
      <th>csv</th>
      <th>sqlite</th>
    </tr>
    <tr>
      <th>n_row</th>
      <th>n_col</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" valign="top">1000</th>
      <th>10</th>
      <td>210687</td>
      <td>139264</td>
      <td>0.009795</td>
      <td>0.015823</td>
    </tr>
    <tr>
      <th>50</th>
      <td>981482</td>
      <td>536576</td>
      <td>0.043167</td>
      <td>0.026356</td>
    </tr>
    <tr>
      <th>100</th>
      <td>1945243</td>
      <td>1048576</td>
      <td>0.084597</td>
      <td>0.042316</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">5000</th>
      <th>10</th>
      <td>1058741</td>
      <td>643072</td>
      <td>0.046930</td>
      <td>0.030381</td>
    </tr>
    <tr>
      <th>50</th>
      <td>4912086</td>
      <td>2637824</td>
      <td>0.214578</td>
      <td>0.077766</td>
    </tr>
    <tr>
      <th>100</th>
      <td>9729717</td>
      <td>5201920</td>
      <td>0.419790</td>
      <td>0.130800</td>
    </tr>
    <tr>
      <th rowspan="3" valign="top">10000</th>
      <th>10</th>
      <td>2118781</td>
      <td>1273856</td>
      <td>0.093032</td>
      <td>0.047522</td>
    </tr>
    <tr>
      <th>50</th>
      <td>9826049</td>
      <td>5259264</td>
      <td>0.429206</td>
      <td>0.137854</td>
    </tr>
    <tr>
      <th>100</th>
      <td>19461683</td>
      <td>10391552</td>
      <td>0.840291</td>
      <td>0.242439</td>
    </tr>
  </tbody>
</table>

Except for the cases when there are only 10 columns and 1000/5000 rows, most of the time SQLite provides at least 2x speed-up on average and the resulted file is 50% smaller than the CSV version.
