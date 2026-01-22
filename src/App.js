import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleVisibilityFriendForm() {
    setIsAddFriendOpen((open) => (open = !open));
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={initialFriends} />
        <FormAddFriend visible={isAddFriendOpen}></FormAddFriend>
        <Button onClick={handleVisibilityFriendForm}>
          {isAddFriendOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend}></Friend>
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <>
      <li key={friend.id}>
        <img src={friend.image} alt={friend.id} />
        <h3>{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} {Math.abs(friend.balance)} €
          </p>
        )}
        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you {friend.balance} €
          </p>
        )}
        {friend.balance === 0 && <p>You and {friend.name} are even</p>}
        <Button>Select</Button>
      </li>
    </>
  );
}

function FormAddFriend({ visible }) {
  //   2 important things , the url , the name
  return (
    <>
      {visible && (
        <form className="form-add-friend">
          <span>Friend Name 🧑</span>
          <input type="text" />
          <span>Image URL 🖼 </span>
          <input type="text" />
          <Button>Add</Button>
        </form>
      )}
    </>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <span>Bill Value 💵 </span>
      <input type="text" />
      <span>Your expenses 🤯 </span>
      <input type="text" />
      <span>X's expenses 🤼</span>
      <input disabled type="text" />
      <span>🤑 Who is paying the bill?</span>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
