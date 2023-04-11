package main

import (
	"log"
	"net/http"
)

func main() {
	log.Println("Listening on :8082...")
	http.HandleFunc("/", serveFiles) // "/" matches everything (See ServeMux)
	log.Fatal(http.ListenAndServeTLS(":8082", "cert.crt", "key.key", nil))
}

func serveFiles(w http.ResponseWriter, r *http.Request) {
	log.Printf("Request: %s\n", r.URL.Path)

	var filePath = r.URL.Path[1:] //remove slash
	if filePath == "" {
		// On empty path display home/index (`browsertest.html`)
		filePath = "browsertest.html"
	} else if filePath == "browsertest.js" || filePath == "browsertest.html" || filePath == "browsertestjs.png" || filePath == "favicon.ico" {
		// Do nothing, serve filepath unmodified.
	} else {
		filePath = "../" + filePath
	}

	log.Printf("Serving: %s", filePath)
	http.ServeFile(w, r, filePath)
}
