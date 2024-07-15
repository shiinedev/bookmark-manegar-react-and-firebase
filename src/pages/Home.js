// src/pages/BookmarkManager.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../services/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const BookmarkManager = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [newBookmarkName, setNewBookmarkName] = useState('');
  const [newBookmarkUrl, setNewBookmarkUrl] = useState('');
  const [editing, setEditing] = useState(null);
  const [currentBookmarkName, setCurrentBookmarkName] = useState('');
  const [currentBookmarkUrl, setCurrentBookmarkUrl] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchBookmarks(user.uid);
      } else {
        setUser(null);
        setBookmarks([]);
      }
    });
  }, []);

  const fetchBookmarks = async (userId) => {
    const q = query(collection(db, "bookmarks"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const bookmarksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBookmarks(bookmarksData);
  };

  const addBookmark = async () => {
    if (user) {
      await addDoc(collection(db, "bookmarks"), { name: newBookmarkName, url: newBookmarkUrl, userId: user.uid, pinned: false });
      setNewBookmarkName('');
      setNewBookmarkUrl('');
      fetchBookmarks(user.uid);
    }
  };

  const updateBookmark = async (id) => {
    const bookmarkDoc = doc(db, "bookmarks", id);
    await updateDoc(bookmarkDoc, { name: currentBookmarkName, url: currentBookmarkUrl });
    setEditing(null);
    setCurrentBookmarkName('');
    setCurrentBookmarkUrl('');
    fetchBookmarks(user.uid);
  };

  const deleteBookmark = async (id) => {
    const bookmarkDoc = doc(db, "bookmarks", id);
    await deleteDoc(bookmarkDoc);
    fetchBookmarks(user.uid);
  };

  const togglePinBookmark = async (id, currentStatus) => {
    const bookmarkDoc = doc(db, "bookmarks", id);
    await updateDoc(bookmarkDoc, { pinned: !currentStatus });
    fetchBookmarks(user.uid);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Bookmark Manager</h1>
      {user ? (
        <>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={newBookmarkName}
              onChange={(e) => setNewBookmarkName(e.target.value)}
              placeholder="Bookmark Name"
            />
            <input
              type="url"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={newBookmarkUrl}
              onChange={(e) => setNewBookmarkUrl(e.target.value)}
              placeholder="Bookmark URL"
            />
            <button onClick={addBookmark} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Add</button>
          </div>
          <ul className="space-y-4">
            {bookmarks.map(bookmark => (
              <li key={bookmark.id} className="flex justify-between items-center">
                {editing === bookmark.id ? (
                  <>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={currentBookmarkName}
                      onChange={(e) => setCurrentBookmarkName(e.target.value)}
                    />
                    <input
                      type="url"
                      className="w-full p-2 border border-gray-300 rounded mt-2"
                      value={currentBookmarkUrl}
                      onChange={(e) => setCurrentBookmarkUrl(e.target.value)}
                    />
                    <button onClick={() => updateBookmark(bookmark.id)} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="font-bold">{bookmark.name}</span>
                      <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="block text-blue-500">{bookmark.url}</a>
                    </div>
                    <div className="space-x-2">
                      <button onClick={() => { setEditing(bookmark.id); setCurrentBookmarkName(bookmark.name); setCurrentBookmarkUrl(bookmark.url); }} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
                      <button onClick={() => deleteBookmark(bookmark.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                      <button onClick={() => togglePinBookmark(bookmark.id, bookmark.pinned)} className="bg-purple-500 text-white px-4 py-2 rounded">{bookmark.pinned ? "Unpin" : "Pin"}</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Please sign in to manage your bookmarks.</p>
      )}
    </div>
  );
};

export default BookmarkManager;
