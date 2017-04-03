package com.sadetec.rest.support;

import java.util.List;

public class PageResponse<T> {

	public int totalPages = 0;
	public long total = 0;
	public List<T> data;
	public boolean success = false;
	public String message = "";

    public PageResponse(List<T> data) {
        this.data = data;
    }

	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public void setData(List<T> data) {
		this.data = data;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public long getTotal() {
		return total;
	}

	public List<T> getData() {
		return data;
	}

	public boolean isSuccess() {
		return success;
	}

	public String getMessage() {
		return message;
	}
	
    

}
