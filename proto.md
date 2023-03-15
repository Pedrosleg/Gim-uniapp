
# 上行+下行

### 消息（群聊/单聊）
```
{
	"msgId": "m233dkdkkf",  # 消息id
	"fr": "user1", # 发送人
	"to": "user2", # 接收人
	"toType": 2, # 1:group|2:single|3:chatroom
	"msgType": 1, # 1:text | 2:image
	"status": 1, # 1:正常｜2:删除｜3:撤回
	"sendTimestamp": 1600000000, #发送时间戳
	"body": {
		"text": "你好",
	}
}
```

### 编辑 （删除/撤回/修改）
```
{
	"fr": "11223"
	"msgId": "",
	"msgType": 3,#编辑
	"status": 2,
	"body": {
		"notice": "你删除了一条消息",
		"editMsgId": "111111"
	}
}
```


-----


# 上行

### 登录
```
{
	"msgId": "m233dkdkkf",  # 消息id
	"fr": "user1", # 发送人
	"msgType": 4,
}
```

### 读消息
```
{
	"fr": "1234"
	"msgId": "asdfasd",
	"dataType": 5,
	"body": {
		"readMsgId": "12345"
	}
}
```


# 气泡机制
> sync 气泡数 + 在线收到新消息数