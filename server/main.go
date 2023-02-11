package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
)

// type Config struct {
// }

type User struct {
	RefreshToken string `json:"refresh_token"`
	AccessToken  string `json:"access_token"`
	ExpiresIn    int    `json:"expires_in"`
	TokenType    string `json:"token_type"`
	Scope        string `json:"scope"`
}

var me User

func comeback(w http.ResponseWriter, req *http.Request) {
	if me.AccessToken == "" {
		code, ok := req.URL.Query()["code"]

		if !ok {
			fmt.Print("Error getting code")
		}

		resp, err := http.PostForm("https://accounts.spotify.com/api/token", url.Values{"grant_type": {"authorization_code"},
			"code":          {code[0]},
			"redirect_uri":  {"http://localhost/comeback"},
			"client_id":     {"6282f7aac72647b5bddf04310dea26dc"},
			"client_secret": {"4f14fbac42564c47b7c073a681cdffd0"}})
		if err != nil {
			fmt.Printf("Error: %v", err)
		}

		defer resp.Body.Close()

		errReadingAnswer := json.NewDecoder(resp.Body).Decode(&me)
		if errReadingAnswer != nil {
			fmt.Printf("Error: %v", errReadingAnswer)
		} else {
			fmt.Print(me)
			meReq, meErr := http.NewRequest("GET", "https://api.spotify.com/v1/me/player", nil)
			if meErr == nil {
				meReq.Header.Add("Authorization", "Bearer "+me.AccessToken)
				meResp, _ := (&http.Client{}).Do(meReq)
				fmt.Print(meResp)
			}
		}
	}
}

// TODO: recieve config
func authorize(w http.ResponseWriter, req *http.Request) {
	http.Redirect(w, req, "https://accounts.spotify.com/authorize?client_id=6282f7aac72647b5bddf04310dea26dc&response_type=code&redirect_uri=http://localhost/comeback&scope=user-read-recently-played user-read-playback-state", 303)
}

func main() {
	http.HandleFunc("/comeback", comeback)
	http.HandleFunc("/authorize", authorize)

	http.ListenAndServe(":80", nil)
}
