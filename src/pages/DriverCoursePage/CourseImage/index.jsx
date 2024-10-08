import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ImageInput from "./ImageInput";
import ImageItem from "./ImageItem";

function CourseImage({ images, setImages }) {
  const handleChange = (result) => {
    if (!result.destination) return;
    const items = [...images];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImages(items);
  };

  return (
    <div className="flex flex-col gap-2 my-8">
      <p className="text-lg text-black font-bold">파티 코스 이미지</p>
      <div className="flex gap-4 custom-scrollbar">
        <ImageInput images={images} setImages={setImages} />
        <DragDropContext onDragEnd={handleChange}>
          <Droppable droppableId="imagelist" direction="horizontal">
            {(provided) => (
              <div
                className="imagelist flex"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {images.map((image, index) => (
                  <Draggable
                    draggableId={typeof image === "string" ? image : image.name}
                    index={index}
                    key={typeof image === "string" ? image : image.name}
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className={`mr-4 ${
                            snapshot.isDragging &&
                            "ring ring-primary rounded-lg"
                          }`}
                        >
                          <ImageItem
                            image={image}
                            images={images}
                            setImages={setImages}
                            index={index}
                            key={index}
                          />
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
      </div>
    </div>
  );
}

export default CourseImage;
