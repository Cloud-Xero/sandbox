```bash
$ mkdir echo && cd echo
$ go mod init echo
$ go get github.com/labstack/echo/v4
$ go get github.com/labstack/echo/v4/middleware
```

Add `./echo` to go.work

```
go 1.20

use (
	./basics
	./example
	./notion
	./echo
)

```
