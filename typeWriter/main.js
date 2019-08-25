// 定义一个类, 完整的封装了要变换 word 的属性以及方法
var TypeWriter = function(txtElement, words, wait) {
	this.txtElement = txtElement
	this.words = words
	// 第二个参数是转成多少进制, 默认十进制, 不过应该总是指定
	this.wait = parseInt(wait, 10)
	this.wordIndex = 0
	this.txt = ''
	// 下面的语法,,第一次见
	this.type()
	this.isDeleting = false
}

var e = function(selector) {
	return document.querySelector(selector)
}

var log = function() {
	console.log.apply(console, arguments)
}
// 使用 prototype 属性将方法加在类的原型上
TypeWriter.prototype.type = function() {
	// 找到当前 word 的下标
	var current = this.wordIndex % this.words.length
	// 当前下标对应的完整 word
	var fullWord = this.words[current]

	// 检查是一个个字母显示还是删除
	if (this.isDeleting) {
		// 删除
		this.txt = fullWord.substring(0, this.txt.length - 1)
	} else {
		// 显示
		this.txt = fullWord.substring(0, this.txt.length + 1)
	}

	// 初始速度
	var typeSpeed = 300

	// 删除时加速
	if (this.isDeleting) {
		typeSpeed /= 2
	}

	// 当某一个 word 显示完全
	if (!this.isDeleting && this.txt === fullWord) {
		// 先暂停 this.wait 时间
		typeSpeed = this.wait
		// 改变状态
		this.isDeleting = true
	} else if (this.isDeleting && this.txt === '') {
		// 指向下一个 word
		this.wordIndex++
		// 再把状态设为 false
		this.isDeleting = false
	}

	this.txtElement.textContent = this.txt

	// 设置定时器, 定时重复执行该函数
	// 箭头函数不绑定 this, 所以这里的 this 指向TypeWriter
	// 如果用匿名函数, 匿名函数的 this 总是指向 window, 所以报错 this.type() is not a function
	setTimeout(() => {
		this.type()
	}, typeSpeed)
}

var init = function() {
	var txtElement = e('.txt-type')
	// 解析成数组
	var words = JSON.parse(txtElement.dataset.words)
	var wait = txtElement.dataset.wait
	// log(txtElement, words, wait)
	new TypeWriter(txtElement, words, wait)
}

var __main = function() {
	// dom 加载并解析完成后执行 init 函数
	document.addEventListener('DOMContentLoaded', init)
}

__main()
