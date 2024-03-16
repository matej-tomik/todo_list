from setuptools import setup, find_packages


VERSION = "1.0.0"
DESCRIPTION = "api that make and manage to do list "


with open('requirements.txt', 'r', encoding='utf-16') as f:
    requirements = f.read()


setup(
    name='to list api',
    version=VERSION,
    author="Matěj Tomík",
    author_email="<mtomik.work@gmail.com>",
    description=DESCRIPTION,
    packages=find_packages(),
    long_description=open('README.md').read(),
    url='https://github.com/matej-tomik/todo-list',
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Programming Language :: Python :: 2",
        "Programming Language :: Python :: 3",
        "Operating System :: Microsoft :: Windows",
    ],
    keywords=["python", "SQL", "API"],
    install_requires=requirements,
)
