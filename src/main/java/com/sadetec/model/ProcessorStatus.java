package com.sadetec.model;

public class ProcessorStatus {

	private String threadId;
	private int activeCount;
	private long total;
	private int finished;
	private int finishByMe;

	public String getThreadId() {
		return threadId;
	}

	public void setThreadId(String threadId) {
		this.threadId = threadId;
	}
	
	public int getActiveCount() {
		return activeCount;
	}

	public void setActiveCount(int activeCount) {
		this.activeCount = activeCount;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public int getFinished() {
		return finished;
	}

	public void setFinished(int finished) {
		this.finished = finished;
	}

	public int getFinishByMe() {
		return finishByMe;
	}

	public void setFinishByMe(int finishByMe) {
		this.finishByMe = finishByMe;
	}

}
