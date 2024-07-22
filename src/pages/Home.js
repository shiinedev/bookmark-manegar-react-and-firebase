// src/BookmarkManager.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../services/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import {   FaThumbtack } from 'react-icons/fa'; // Import pin icons



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

  // fetch Bookmarks
  const fetchBookmarks = async (userId) => {
    const q = query(
      collection(db, "bookmarks"),
      where("userId", "==", userId),
      orderBy("order")
    );
    const querySnapshot = await getDocs(q);
    const bookmarksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBookmarks(bookmarksData);
  };
  //addBookmark

  const addBookmark = async () => {
    if (user) {
      const newOrder = bookmarks.length;
      await addDoc(collection(db, "bookmarks"), { name: newBookmarkName, url: newBookmarkUrl, userId: user.uid, pinned: false, order: newOrder });
      setNewBookmarkName('');
      setNewBookmarkUrl('');
      fetchBookmarks(user.uid);
    }
  };

  //updateBookmark
  const updateBookmark = async (id) => {
    const bookmarkDoc = doc(db, "bookmarks", id);
    await updateDoc(bookmarkDoc, { name: currentBookmarkName, url: currentBookmarkUrl });
    setEditing(null);
    setCurrentBookmarkName('');
    setCurrentBookmarkUrl('');
    fetchBookmarks(user.uid);
  };
//delete Bookmark
  const deleteBookmark = async (id) => {
    const bookmarkDoc = doc(db, "bookmarks", id);
    await deleteDoc(bookmarkDoc);
    fetchBookmarks(user.uid);
  };

  //pin bookmark
  const togglePinBookmark = async (id, currentStatus) => {
    const bookmarkDoc = doc(db, "bookmarks", id);
    // const bookmark = bookmarks.find(bookmark => bookmark.id === id);
    let updatedBookmarks;

    if (!currentStatus) {
      // Pin the bookmark: move it to the first position
      updatedBookmarks = bookmarks.map(bookmark => {
        if (bookmark.id === id) {
          return { ...bookmark, pinned: true, order: 0 };
        } else if (bookmark.pinned) {
          return bookmark;
        } else {
          return { ...bookmark, order: bookmark.order + 1 };
        }
      });
    } else {
      // Unpin the bookmark: move it back to its original position
      updatedBookmarks = bookmarks.map(bookmark => {
        if (bookmark.id === id) {
          return { ...bookmark, pinned: false, order: bookmarks.length - 1 };
        } else if (bookmark.pinned) {
          return bookmark;
        } else {
          return { ...bookmark, order: bookmark.order - 1 };
        }
      });
    }

    // Sort bookmarks to ensure correct order after pin/unpin
    updatedBookmarks.sort((a, b) => a.order - b.order);
    await updateDoc(bookmarkDoc, { pinned: !currentStatus, order: updatedBookmarks.findIndex(b => b.id === id) });
    setBookmarks(updatedBookmarks);
  };

  return (
    <div className='sm:w-100  lg:w-3/4 lg:m-auto'>
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
            <button onClick={addBookmark} className="bg-black text-white px-4 py-2 rounded mt-2">Add</button>
          </div>
          <ul className="space-y-4 ">
            {bookmarks.map(bookmark => (
              <li key={bookmark.id} className="flex justify-between items-center bg-gray-200 p-3 rounded">
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
                    <button onClick={() => updateBookmark(bookmark.id)} className="bg-gray-800 text-white px-4 py-2 rounded">Save</button>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="font-bold">{bookmark.name}</span>
                      <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="block text-blue-500">{bookmark.url}</a>
                    </div>
                    <div className="space-x-2 flex items-center">
                      <button onClick={() => { setEditing(bookmark.id); setCurrentBookmarkName(bookmark.name); setCurrentBookmarkUrl(bookmark.url); }} className="bg-gray-100 text-black px-4 py-2 rounded">Edit</button>
                      <button onClick={() => deleteBookmark(bookmark.id)} className="bg-black text-white px-4 py-2 rounded">Delete</button>
                      <button onClick={() => togglePinBookmark(bookmark.id, bookmark.pinned)} className="text-white  bg-gray-800 p-2 rounded">
                        {bookmark.pinned ? <FaThumbtack /> : "pin"}
                      </button>
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
