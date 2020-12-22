# Superchat
Superchat is an open-source Decentralized Finance(Defi) chat æpp built mainly for the Superhero.com platform at https://superchat.aekiti.com.

## Inspiration
We were inspired by the idea of building a secure chat platform, on the blockchain where tokens can be sent with minimal loss and optimum security in the form of a message.

## What it does
Superchat sends AE tokens from one user to another easily as they chat with friends and family thereby reducing the loss of funds in AE tokens transfer. Superchat runs with three smart contracts that help it perform and build a solution for our inspiration. The contracts are SuperChatProfile, SuperChatFriend, and SuperChatMessage.

The SuperChatProfile contract starts the authentication flow by registering a user and getting the user details. The SuperChatFriend contract connects remotely with the ProfileContract to send a friend request, accept or reject friend requests, get friend requests, and finally get each user friend list.

Lastly, the SuperchatMessage contract performs the work of sending messages and even AE tokens to friends as a message

## How we built it
Superchat is built on æternity blockchain and it uses ReactJS for its Front-End implementation.

The repository contains source codes that sum up Superchat. It has its smart contracts written and tested with the AEproject tool. It has its wallet created using the AECLI tool.

The react Front-End implementation uses the AEproject React shape that follows the theme and layout of the voting section of the Superhero.com platform.

## What's next for Superchat
- Implementation of the group functionalities, to enable a user to send tokens and messages to members of the created group.
- Implementing a group saving feature to allow users to save AE tokens for some time.

## [License](./LICENSE)
```markdown
MIT License

Copyright (c) 2020 ækiti æmbassy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
```