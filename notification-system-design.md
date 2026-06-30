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

# Stage 3

As the data in the SQL table has grown the search/retrivel times also slowdown, without indexes each rows are checked for the given query, like the studentId field in the given query.

Creating an index is a solution for the problem but creating it on every column is unneccessary as the other developer suggested. Instead we should create an index on columns which are used to fetch rows frequently. Which in this case is `studentID`.

Query:
SELECT \* FROM notifications
WHERE notificationType='Placements'
AND createdAt >= NOW() - INTERVAL 7 DAY
ORDER BY createdAt ASC

# Stage 4

In order to prevent the load on DB due to notifications being fetched on each page load, I would take measures that would reduce the amount of API calls to the notification systems.

First I would look if there are unneccessary or redundant API calls being made such as if the API call is being made in useEffect I will check if it has a dependancy array because without it, it will run on every render.

I will also implement some caching strategy where I would fetch notifications and then cache it in the app, and then either next fetch would be after some time (ex. 5 mins) or when some action is taken which invalidates the existing cached data. A tradeoff of this method is the user may have to wait for a few minutes before they get some notifications.

# Stage 5

The given function is very inefficent, It sends email, saves to DB, and push to app one by one for each student, if any of the action fails there is no fallback to either retry or cleanup other actions.

For example, the 200 students' `send_email` call that failed, it is still possible that the notification is saved to DB and showed in the app.

First I would implement safe guard that make sure either all actions happen or none does. Also I would implement exponential backoff which would ensure that if some action fails it retries after some interval which increases with each try/failure.
