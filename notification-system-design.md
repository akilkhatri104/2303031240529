# Notification System Design

The notification system will have the following API endpoints that the frontend can consume.

All the below routes are only accessbale to authorized users. The access tokens are to be sent with the headers.

## `/notification` (POST): Creates a notification when some event occurs.

- Request Body:

```
{
    userId: "ID of the user the notification is for",
    title: "Title of the notification",
    type: "The type of notification like 'Placements', 'Academics' etc.",
    description: "The description of the notification or event",
    action: "Any action that needs to be taken"
}
```

- Response Body:

```
{
    id: "The ID of the notification"
}
```

## `/notification` (GET): Get all notification associeted with an authenticated user

- Response Body:

```
{
    notifications: [
        {
            id: "The Id of notification",
            userId: "ID of the user the notification is for",
            title: "Title of the notification",
            type: "The type of notification like 'Placements', 'Academics' etc.",
            description: "The description of the notification or event",
            action: "Any action that needs to be taken",
            isRead: "Boolean value showing if the notification is read by the user",
            createdAt: "Date when the notification was created at"
        }
    ]
}
```

## `/notification/read/:id` (UPDATE): Toggle `isRead` field, can only be done byy authorized user where the `userId` in notification is same as the logged in user.

- Request Body: No request body required
- Response Body:

```
{
    id: "ID of the notification",
    isRead: "Boolean value showing if a user has read the notification."
}
```

# Stage 2

On the basis of the earlier API contract created, I would use SQL relational database to store the notifications. SQL provides complex scalebale data storing options. It provides complex joins and relationships between tables whcih can be used to have proper relations between various tables.

As the data volume increase, we may have problems with retrivel or search time which can be solved using indexes.

## SQL Queries:

- Fetch all notifications for a user
  SELECT \* FROM notifications where userID=1234
