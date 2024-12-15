import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Destination } from "../../../types";
import dragIcon from "../../../assets/svg/dragIcon.svg";
import deleteIcon from "../../../assets/svg/x-modal-icon.svg";
import TimeModal from "./TimeModal";
import clsx from "clsx";

interface DestinationImage extends Destination {
  image?: string | File;
}

interface Props {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  hours: number;
  destinations: DestinationImage[];
  setDestinations: Dispatch<SetStateAction<DestinationImage[]>>;
  startTime: string;
  endTime: string;
  setStartTime: Dispatch<SetStateAction<string>>;
}

function CourseDnD({
  name,
  setName,
  hours,
  destinations,
  setDestinations,
  startTime,
  endTime,
  setStartTime,
}: Props) {
  const [showTimeModal, setShowTimeModal] = useState(false);

  const handleChange = useCallback(
    (result: any) => {
      if (!result.destination) return;
      const items = [...destinations];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setDestinations(items);
    },
    [destinations]
  );

  const deleteHandler = useCallback(
    (targetIndex: number) => {
      setDestinations(destinations.filter((_, index) => index !== targetIndex));
    },
    [destinations]
  );

  return (
    <>
      <div className="mt-20 font-bold flex flex-col items-center gap-6">
        <input
          type="text"
          className="w-full text-boldblue text-2xl text-center focus:outline-none placeholder:text-darkgray"
          placeholder="파티 코스 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="text-primary text-xl">{`${hours}시간`}</div>
      </div>
      <DragDropContext onDragEnd={handleChange}>
        <Droppable droppableId="courselists">
          {(provided) => (
            <div
              className="courselists bg-skyblue w-full md:w-[900px] my-6 mx-auto border border-primary"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {destinations.map((item, index) => (
                <Draggable
                  draggableId={(item.destinationId * index).toString()}
                  index={index}
                  key={(item.destinationId * index).toString()}
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={clsx(
                          "bg-white w-4/5 md:w-[700px] h-[83px] mx-auto text-boldblue text-lg md:text-xl text-bold flex items-center",
                          snapshot.isDragging && "border-2 border-primary"
                        )}
                      >
                        <img
                          src={dragIcon}
                          alt="drag"
                          className="ml-2.5 mr-5"
                        />
                        <div>{item.name}</div>
                        <div
                          className={clsx(
                            "ml-auto",
                            index === 0 && "cursor-pointer hover:font-bold"
                          )}
                          onClick={() => index === 0 && setShowTimeModal(true)}
                        >
                          {index === 0
                            ? startTime
                            : index === destinations.length - 1 && endTime}
                        </div>
                        <button
                          className="mx-3 rounded hover:bg-gray-200"
                          onClick={() => deleteHandler(index)}
                        >
                          <img src={deleteIcon} alt="delete" />
                        </button>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <TimeModal
        showModal={showTimeModal}
        setShowModal={setShowTimeModal}
        startTime={startTime}
        setStartTime={setStartTime}
      />
    </>
  );
}

export default memo(CourseDnD);
