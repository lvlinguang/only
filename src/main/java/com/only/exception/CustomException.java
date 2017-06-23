package com.only.exception;

/**
 * 自定义错误类
 * 
 * @author lvlinguang
 * 
 */
public class CustomException extends Exception {

	public String message;

	public CustomException(String message) {
		super(message);
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
