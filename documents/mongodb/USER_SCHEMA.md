# Prisma Schema Documentation for MongoDB

This schema defines the structure and relations for a user-centric application with messaging and account management features using MongoDB as a database.

## Generators

The following generator configuration specifies the Prisma client as a JavaScript client.

<pre><div class="bg-black rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>prisma</span><button class="flex ml-auto gizmo:ml-0 gap-2 items-center"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-prisma">generator client {
  provider = "prisma-client-js"
}
</code></div></div></pre>

## Data Source

The data source is configured to connect to a MongoDB database, with the connection URL being provided by an environment variable `MONGODB_DATABASE_URL`.

## Models

### User

Represents the user of the application with unique email and username fields. Users have roles, a profile, conversations, seen messages, and accounts.

- `id`: A unique identifier for the user.
- `email`: The user's email address, which is unique.
- `username`: A unique username for the user.
- `name`: The full name of the user.
- `rolesIds`: An array of ObjectIds that reference the `Role` model.
- `roles`: Relations to the `Role` model to indicate the user's roles.
- `profileId`: A reference to the user's profile information.
- `profile`: An optional one-to-one relationship with the `Profile` model.
- `status`: An enum indicating the user's account status.
- `createdAt`: The date and time when the user was created.
- `updatedAt`: The last date and time the user's information was updated.
- `lastLogin`: The last date and time the user logged in.
- `emailVerified`: The date and time the user's email was verified.
- `hashedPassword`: A hashed password for the user.
- `conversationIds`: An array of ObjectIds for conversations the user is part of.
- `conversations`: Relations to the `Conversation` model for conversations the user is part of.
- `seenMessageIds`: An array of ObjectIds for messages the user has seen.
- `seenMessages`: Relations to the `Message` model for messages seen by the user.
- `accounts`: Relations to the `Account` model for the user's linked accounts.
- `message`: Relations to the `Message` model for messages sent by the user.

### Account

Represents linked accounts for users, such as OAuth accounts.

- `id`: A unique identifier for the account.
- `userId`: A reference to the associated user.
- `type`: The type of account, e.g., "OAuth".
- `provider`: The provider of the account, e.g., "Google".
- `providerAccountId`: An identifier for the provider account.
- `refresh_token`: An optional OAuth refresh token.
- `access_token`: An optional OAuth access token.
- `expires_at`: An optional expiration time for the access token.
- `token_type`: The type of token, if applicable.
- `scope`: The OAuth scope granted to the token, if applicable.
- `id_token`: An identifier token for the account.
- `session_state`: The state of the session for this account.
- `user`: A required relation to the `User` model, with cascade delete behavior.

### Conversation

Represents a conversation which can be between two users or a group.

- `id`: A unique identifier for the conversation.
- `created_at`: The creation date and time of the conversation.
- `lastMessageAt`: The date and time of the last message in the conversation.
- `name`: An optional name for the group conversation.
- `isGroup`: A Boolean flag indicating if the conversation is a group.
- `messagesIds`: An array of ObjectIds for messages in the conversation.
- `messages`: Relations to the `Message` model for messages in the conversation.
- `userIds`: An array of ObjectIds for users in the conversation.
- `users`: Relations to the `User` model for users part of the conversation.

### Message

Represents a message in a conversation.

- `id`: A unique identifier for the message.
- `body`: The text body of the message.
- `image`: An optional URL to an image associated with the message.
- `createAt`: The creation date and time of the message.
- `seenIds`: An array of ObjectIds for users who have seen the message.
- `seen`: Relations to the `User` model for users who have seen the message.
- `conversationId`: A reference to the associated conversation.
- `conversation`: A required relation to the `Conversation` model with cascade delete behavior.
- `senderId`: A reference to the user who sent the message.
- `sender`: A required relation to the `User` model with cascade delete behavior.

### Profile

Extends user information, providing additional contact and personal details.

- `id`: A unique identifier for the profile.
- `userId`: A unique reference to the associated user.
- `user`: A one-to-one relation to the `User` model.
- `phoneNumber`: An optional phone number for the user.
- `address`: An optional address for the user.
- `imageUrl`: An optional URL to the user's image.

### Role

Defines roles within the application.

- `id`: A unique identifier for the role.
- `name`: The name of the role, which is unique.
- `userIds`: An array of ObjectIds for users with this role.
- `users`: Relations to the `User` model for users with this role.
- `permissionsIds`: An array of ObjectIds for permissions associated with this role.
- `permissions`: Relations to the `Permission` model for permissions granted by this role.

### Permission

Specifies permissions granted to roles.

- `id`: A unique identifier for the permission.
- `name`: The name of the permission, which is unique.
- `rolesIds`: An array of ObjectIds for roles that have this permission.
- `roles`: Relations to the `Role` model for roles with this permission.

## Enumerations

### UserStatus

Defines possible states for a user's account.

- `ACTIVE`: The user's account is active and in good standing.
- `SUSPENDED`: The user's account is suspended and may not have full privileges.
- `EMAIL_VERIFIED`: The user's email has been verified, distinguishing it from unverified accounts.

---

This documentation provides a comprehensive guide to the structure defined by the Prisma schema for a MongoDB database. It covers models, fields, relationships, and enumerations that together form the database design for an application with user authentication and messaging features.
