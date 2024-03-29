import type { CollectionAction } from '/@/data/collections';
import { inlineIconsMap } from '/@/data/collections/iconActions/inlineIconsMap';
import type { FC } from 'react';
import { ReactComponent as EditIcon } from '/assets/icons/pencil-alt.svg';
import { ReactComponent as EyeIcon } from '/assets/icons/eye.svg';
import { ReactComponent as EyeOffIcon } from '/assets/icons/eye-off.svg';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactComponent as DragHandleIcon } from '/assets/icons/drag-handle.svg';
import type { ActionsListProps } from '.';
import Tooltip from 'rc-tooltip';

interface Props extends Omit<ActionsListProps, 'actionItems' | 'setActionItems'> {
  item: CollectionAction;
  onActionChange: (selectedAction: CollectionAction) => void;
}

export const ActionItem: FC<React.PropsWithChildren<Props>> = ({ item, onEditClick, onActionChange }) => {
  const icon = inlineIconsMap[item.icon];

  const onVisibleChange = () => {
    onActionChange({ ...item, hidden: !item.hidden });
  };

  const { attributes, listeners, setNodeRef, transform, transition, isSorting } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: !transition ? 1 : 0,
  };

  return (
    <div
      className="group py-1 border-b border-gray-400 relative flex"
      ref={setNodeRef}
      style={style}
    >
      <div className="text-black dark:text-gray-200 group flex items-center w-full outline-none px-2 py-2 text-sm">
        <div className="mr-2">{icon}</div>
        {item.name}
      </div>

      <div {...attributes} {...listeners} className="flex items-center mr-1 outline-none">
        <DragHandleIcon />
      </div>

      <div
        className={`${
          !isSorting && 'group-hover:opacity-100'
        } opacity-20 w-0 h-full relative top-0 -right-2`}
      >
        <div className="absolute px-2 py-2 flex gap-3">
          {item.isEditable && (
            <button className="outline-none" type="button" onClick={() => onEditClick(item)}>
               <Tooltip
             placement="top"
             overlay={
               <span>
                 Edit
               </span>
             }
           >
             <EditIcon />
             </Tooltip>
            </button>
          )}
          <button className="outline-none" type="button" onClick={onVisibleChange}>
            {item.hidden ?   
            <Tooltip
             placement="right"
             overlay={
               <span>
                 Show/Hide
               </span>
             }
           >
            <EyeOffIcon />
            </Tooltip> :  <Tooltip
             placement="right"
             overlay={
               <span>
                 Show/Hide
               </span>
             }
           >
            <EyeIcon />
            </Tooltip>
           }
          </button>
        </div>
      </div>
    </div>
  );
};
