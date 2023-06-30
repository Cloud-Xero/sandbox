package main

type Filter struct {
	Or  *[]FilterCondition `json:"or,omitempty"`
	And *[]Filter          `json:"and,omitempty"`
}

type FilterCondition struct {
	Property    string       `json:"property"`
	Status      *Status      `json:"status,omitempty"`
	Select      *Select      `json:"select,omitempty"`
	MultiSelect *MultiSelect `json:"multi_select,omitempty"`
}

type Status struct {
	Equals    *string `json:"equals,omitempty"`
	NotEquals *string `json:"does_not_equal,omitempty"`
}

type Select struct {
	Equals    string `json:"equals,omitempty"`
	NotEquals string `json:"does_not_equal,omitempty"`
}

type MultiSelect struct {
	Contains       *string `json:"contains,omitempty"`
	DoesNotContain *string `json:"does_not_contain,omitempty"`
}

type RequestBody struct {
	Filter Filter `json:"filter"`
}

type Property struct {
	Select struct {
		Name string `json:"name"`
	} `json:"select,omitempty"`
}

type Response struct {
	Results []Page `json:"results"`
}

type ResponseData struct {
	Results []struct {
		ID         string `json:"id"`
		Properties struct {
			Name struct {
				Title []struct {
					Text struct {
						Content string `json:"content"`
					} `json:"text"`
				} `json:"title"`
			} `json:"Name"`
		} `json:"properties"`
	} `json:"results"`
}

type Page struct {
	ID         string                 `json:"id"`
	Properties map[string]interface{} `json:"properties"`
}

type UpdateRequest struct {
	PageID     *string                `json:"page_id,omitempty"`
	Properties map[string]interface{} `json:"properties"`
}

type PageResponse struct {
	Object     string `json:"object"`
	ID         string `json:"id"`
	Properties struct {
		Name struct {
			Title []struct {
				Text struct {
					Content string `json:"content"`
				} `json:"text"`
			} `json:"title"`
		} `json:"Name"`
	} `json:"properties"`
}
