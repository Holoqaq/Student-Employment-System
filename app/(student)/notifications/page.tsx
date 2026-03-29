"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Bell, CheckCircle2, Briefcase, Send, Clock, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthRequired } from "@/components/auth-required";
import Link from "next/link";

// 模拟通知数据
const mockNotifications = [
  {
    id: "1",
    type: "resume",
    title: "您的简历已通过审核",
    content: "您的简历已经通过系统审核，可以开始投递岗位了。",
    time: "2分钟前",
    read: false,
  },
  {
    id: "2",
    type: "job",
    title: "有3个新岗位推荐",
    content: "根据您的专业和求职意向，我们为您推荐了3个匹配度较高的岗位。",
    time: "1小时前",
    read: false,
  },
  {
    id: "3",
    type: "application",
    title: "您的投递已被查看",
    content: "您投递的字节跳动前端开发工程师岗位已被招聘人员查看。",
    time: "3小时前",
    read: true,
  },
  {
    id: "4",
    type: "job",
    title: "岗位申请截止提醒",
    content: "您关注的腾讯产品经理岗位将在24小时后截止申请。",
    time: "1天前",
    read: true,
  },
  {
    id: "5",
    type: "system",
    title: "系统更新通知",
    content: "智联校园平台已完成系统更新，新增了数据分析功能。",
    time: "2天前",
    read: true,
  },
  {
    id: "6",
    type: "application",
    title: "面试邀请",
    content: "您已获得阿里巴巴数据分析师岗位的面试邀请，请查看详情。",
    time: "3天前",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 过滤通知
  const filteredNotifications = notifications.filter(notification => {
    const typeMatch = selectedType === "all" || notification.type === selectedType;
    const statusMatch = selectedStatus === "all" || 
                      (selectedStatus === "unread" && !notification.read) ||
                      (selectedStatus === "read" && notification.read);
    const searchMatch = searchQuery === "" || 
                      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      notification.content.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && statusMatch && searchMatch;
  });

  // 标记为已读
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // 标记所有为已读
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // 删除通知
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // 获取通知类型图标
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "resume":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "job":
        return <Briefcase className="h-5 w-5 text-blue-600" />;
      case "application":
        return <Send className="h-5 w-5 text-amber-600" />;
      case "system":
        return <Bell className="h-5 w-5 text-purple-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  // 获取通知类型标签
  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case "resume":
        return "简历相关";
      case "job":
        return "岗位推荐";
      case "application":
        return "投递进展";
      case "system":
        return "系统通知";
      default:
        return "其他";
    }
  };

  return (
    <AuthRequired roles={['student']}>
      <div className="mx-auto max-w-4xl px-4 py-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              返回首页
            </Link>
            <h1 className="ml-4 text-2xl font-bold text-foreground">通知中心</h1>
          </div>
          <Button variant="outline" className="gap-2" onClick={markAllAsRead}>
            <CheckCircle2 className="h-4 w-4" />
            全部标为已读
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="grid gap-2">
            <Label className="text-sm font-medium">通知类型</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="选择类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="resume">简历相关</SelectItem>
                <SelectItem value="job">岗位推荐</SelectItem>
                <SelectItem value="application">投递进展</SelectItem>
                <SelectItem value="system">系统通知</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label className="text-sm font-medium">状态</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="unread">未读</SelectItem>
                <SelectItem value="read">已读</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2 flex-1 min-w-[200px]">
            <Label className="text-sm font-medium">搜索</Label>
            <div className="relative">
              <Input
                placeholder="搜索通知内容"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Bell className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border ${notification.read ? 'border-border' : 'border-primary/30 bg-primary/5'}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">{notification.title}</CardTitle>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary" className="text-xs">
                            {getNotificationTypeLabel(notification.type)}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.time}
                          </span>
                          {!notification.read && (
                            <Badge className="bg-primary text-xs">未读</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="h-8 px-2"
                      >
                        {notification.read ? '已读' : '标为已读'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="h-8 px-2 text-red-600 hover:text-red-700"
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">{notification.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card py-20">
            <Bell className="mb-3 h-12 w-12 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">
              没有找到符合条件的通知
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            共 {filteredNotifications.length} 条通知
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              上一页
            </Button>
            <Button variant="outline" size="sm" disabled>
              下一页
            </Button>
          </div>
        </div>
      </div>
    </AuthRequired>
  );
}
