import React, { useState } from "react";
import { reactToPost } from "../../client/fetchPosts";

export default function Reactions({ reactions, postId }) {
  const [newReactions, setNewReactions] = useState([]);
  /* We define what emojis are available for the user experience */
  const emjois = ["😀", "🥲", "🥰", "👍", "🌹"];
  // reactions is a list of objects: {emoji: "", count: 1}
  const handleReaction = async (symbol) => {
    try {
      const res = await reactToPost(symbol, postId);

      if (res.status === 200) {
        setNewReactions((prev) => {
          if (prev?.length > 0) {
            let newArray = [];
            let hasSymbol = false;

            for (let s of prev) {
              if (s.symbol === symbol) {
                newArray.push({ symbol: symbol, count: s.count + 1 });
                hasSymbol = true;
              } else {
                newArray.push(s);
              }
            }
            if (!hasSymbol) {
              newArray.push({ symbol: symbol, count: 1 });
            }

            return newArray;
          }
          let newArray = [{ symbol: symbol, count: 1 }];

          return newArray;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="reaction__container">
      {emjois?.map((em) => {
        let count = 0;
        if (reactions?.length > 0) {
          for (let s of reactions) {
            if (s.symbol === em) {
              count += s.count;
            }
          }
        }
        if (newReactions?.length > 0) {
          for (let s of newReactions) {
            if (s.symbol === em) {
              count += s.count;
            }
          }
        }

        return (
          <>
            <button
              className="reaction__button"
              onClick={() => {
                handleReaction(em);
              }}
            >
              {em}
            </button>
            <span className="emoji__counter">{count}</span>
          </>
        );
      })}
    </section>
  );
}
