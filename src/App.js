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
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function HandleVisivilityForm() {
    setIsAddFriendOpen((open) => (open = !open));
  }
  function HandleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setIsAddFriendOpen(false);
  }

  function handleSelectedFriend(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setIsAddFriendOpen(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          selectedFriend={selectedFriend}
          handleSelectedFriend={handleSelectedFriend}
          friends={friends}
        />
        <FormAddFriend
          onAddFriend={HandleAddFriend}
          visible={isAddFriendOpen}
        ></FormAddFriend>
        <Button onClick={HandleVisivilityForm}>
          {isAddFriendOpen ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
function FriendList({ friends, handleSelectedFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          selectedFriend={selectedFriend}
          handleSelectedFriend={handleSelectedFriend}
          key={friend.id}
          friend={friend}
        ></Friend>
      ))}
    </ul>
  );
}

function Friend({ friend, handleSelectedFriend, selectedFriend }) {
  // Selected friend
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <>
      <li key={friend.id} className={isSelected ? "selected" : ""}>
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
        <Button onClick={() => handleSelectedFriend(friend)}>
          {isSelected ? "Close" : "Select"}
        </Button>
      </li>
    </>
  );
}

function FormAddFriend({ visible, onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();

    if (!name || !image) return;

    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");

    console.log(newFriend);
    // return initialFriends.map((friends) => [...friends, newFriend]);
  }
  return (
    <>
      {visible && (
        <form className="form-add-friend" onSubmit={handleSubmit}>
          <span>Friend Name 🧑</span>
          <input
            value={name}
            onChange={(e) => {
              console.log(e.target.value);
              setName(e.target.value);
            }}
            type="text"
          />
          <span>Image URL 🖼 </span>
          <input
            value={image}
            onChange={(e) => {
              console.log(e.target.value);
              setImage(e.target.value);
            }}
            type="text"
          />
          <Button>Add</Button>
        </form>
      )}
    </>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>
      <span>Bill Value 💵 </span>
      <input type="text" />
      <span>Your expenses 🤯 </span>
      <input type="text" />
      <span>{selectedFriend.name} expenses 🤼</span>
      <input disabled type="text" />
      <span>🤑 Who is paying the bill?</span>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
