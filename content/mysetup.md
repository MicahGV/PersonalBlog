---
title: My Setup
date: 2018-12-28T05:20:58.000Z
menu: main
weight: '40'
meta: 'false'
---
This will be the place where I put all my Set ups for you all to behold either it be code related or hardware related. There's not much here, but there will be more in the future once I actually sit and write about it.

- - -

## Git Aliases

A Better git log 

[reference](https://coderwall.com/p/euwpig/a-better-git-log)

```gitconfig
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

Called like
`git lg` or `git lg -p` for what was changed

General Niceties

[reference](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)

_Side Note: the reference is a great book if you're learning Git_

```gitconfig
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```

called like

`git co`

`git br`

`git ci`

`git st`

Last commit

```gitconfig
git config --global alias.last 'log -1 HEAD'
```

called like `git last`

## Git Config

Auto Correct 

[reference](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration#_code_help_autocorrect_code)

```gitconfig
git config --global help.autocorrect 20
```

If you misspell checout it will guess checkout and auto run in 2 seconds
