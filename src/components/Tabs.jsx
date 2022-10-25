import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/tabs.css";
import Poster from "./Poster";
import UserList from "./user/UserList";

const Tabs = ({
  arrayTabs,
  arrayContent,
  //
  currentID,
  setCurrentID,
  anotherUser,
  setAnotherUser,
  friendEmail,
  //
  deletePlaylist,
  deleteMovieFromPlaylist,
}) => {
  const [toggleState, setToggleState] = useState(0);
  // console.log(arrayContent[0][0].uid && arrayContent[1]);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div>
      <div>
        <div className="block-tabs ">
          {/* FOREACH nameTabs */}
          {arrayTabs &&
            !anotherUser &&
            arrayTabs.map((element, id) => (
              <div
                key={id}
                className={` ${
                  toggleState === id ? "tabs active-tabs" : "tabs"
                } flex justify-center items-center`}
                onClick={() => toggleTab(id)}
              >
                <div className="flex ">{element}</div>
                <div>
                  {element != "All User" && element != "Friends" && (
                    <div className="pl-2">
                      <button onClick={() => deletePlaylist(id)}>X</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <div className="">
          {arrayContent.length ? (
            <div>
              <div>
                {arrayContent[toggleState].length ? (
                  arrayContent[toggleState][0].uid && (
                    <div className="pt-2 ">
                      <UserList
                        arrayContent={arrayContent[toggleState]}
                        // user={element}
                        arrayTab={arrayTabs[toggleState]}
                        currentID={currentID}
                        setCurrentID={setCurrentID}
                        anotherUser={anotherUser}
                        setAnotherUser={setAnotherUser}
                        //
                        // friendsList={arrayContent[0][0] && arrayContent[1]}
                      />
                    </div>
                  )
                ) : (
                  <div className="py-2 px-3 bg-gray-400 text-center">
                    Нет пользователей
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div> </div>
          )}
        </div>
        <div className="content-tabs ">
          {/* FOREACH contentTabs */}
          {arrayContent.length ? (
            <div>
              <div className="my-2 overflow-hidden flex justify-center items-center">
                {arrayContent[toggleState].length ? (
                  <div className="flex gap-8 overflow-hidden">
                    {arrayContent[toggleState].map((element, id) => (
                      <div key={id}>
                        <div className="">
                          {!element.uid && (
                            <div>
                              <div className="w-32">
                                <Link
                                  to={
                                    element.vote_average > 0
                                      ? `/movie/${
                                          element.title ? "movie" : "tv"
                                        }_${element.id}_${
                                          element.title
                                            ? element.title
                                            : element.name
                                        }`
                                      : "/"
                                  }
                                >
                                  <a href="">
                                    <Poster movie={element} id={1} />
                                  </a>
                                </Link>
                              </div>
                              <button
                                onClick={() =>
                                  deleteMovieFromPlaylist(toggleState, id)
                                }
                              >
                                <div className="w-4 h-4 bg-red-700">X</div>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className=""></div> // h-[800px] bg-green-600 w-24
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center w-[900px] h-56 text-2xl bg-gray-800">
              <span>У вас еще нет плейлистов</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;

//////////// SAVE
{
  /* <div className="">
                        {!element.uid && (
                          <div>
                            <Link
                              to={
                                element.vote_average > 0
                                  ? `/movie/${element.title ? "movie" : "tv"}_${
                                      element.id
                                    }_${
                                      element.title
                                        ? element.title
                                        : element.name
                                    }`
                                  : "/"
                              }
                            >
                              <a href="">
                                <Poster movie={element} id={1} />
                              </a>
                            </Link>
                          </div>
                        )}
                      </div> */
}
