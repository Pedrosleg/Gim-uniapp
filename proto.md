
# 上行+下行

### 消息（群聊/单聊）
```
{
	"msgId": "m233dkdkkf",  # 消息id
	"fr": "user1", # 发送人
	"to": "user2", # 接收人
	"seq": 1600000000000, #13位递增序号
	"toType": 2, # 1:group|2:personal|3:chatroom
	"msgType": "text", # 1:text | 2:image
	"status": 1, # 1:正常｜2:删除｜3:撤回
	"sendTimestamp": 1600000000000, #发送时间戳, 由服务端生成
	"body": {
		"text": "你好",
	}
}
```

### 编辑 （删除/撤回/修改）
```
{
	"fr": "11223"
	"msgType": "edit",#编辑
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
	"fr": "user1", # 发送人
	"msgType": "login",
}
```

### 读消息
```
{
	"fr": "1234",
	"msgType": "readMsg",
	"body": {
		"readMsgIds": ["12345"]
	}
}
```

### pullMsg, 拉消息
```
{
	"fr": "1234",
	"msgType": "pullMsg",
	"body": {}
}
```

### receiveMsg, 确认收到
```
{
	"fr": "1234",
	"msgType": "receiveMsg",
	"body": {
		"seqs": {
			"1234": 1600004000000,
			"2345": 1600010000000
		}
	}
}
```

# 气泡机制
> sync 气泡数 + 在线收到新消息数