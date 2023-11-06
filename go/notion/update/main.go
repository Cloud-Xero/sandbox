package main

func main() {

	// monthlyFlagがtrueの時、月次処理
	monthlyFlag := true

	if monthlyFlag {

		// Monthly Execution
		// UpdateSelectedMonthlyColor()  // DBのテンプレートを直接変更することはできないので現状使用不可（ページ = 行単位で行う必要がある）
		res := GetSelectedMonthData()
		UpdateSelectedMonthData(res)
	}

	// Weekly Execution
	// UpdateSelectedWeeklyColor()  // DBのテンプレートを直接変更することはできないので現状使用不可（ページ = 行単位で行う必要がある）
	resBody := GetSelectedWeekData()
	UpdateSelectedWeekData(resBody)
}
