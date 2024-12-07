package main

import (
	"net/http"

	"go-react-demo/web"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	web.RegisterHandlers(e)

	e.GET("/api", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello world!")
	})
	e.Logger.Fatal(e.Start(":8080"))
}
