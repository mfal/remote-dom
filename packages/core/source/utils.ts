export function getNodePosition(
  childrenOrNode: ArrayLike<unknown> | Node,
  remoteId?: number,
) {
  const children =
    childrenOrNode instanceof Node ? childrenOrNode.childNodes : childrenOrNode;
  const id = remoteId?.toString();

  if (!id || !children || children.length === 0) {
    return 0;
  }

  return Array.from(children).findIndex((c) => {
    if (!c || typeof c !== 'object') {
      return -1;
    }

    if ('getAttribute' in c && typeof c.getAttribute === 'function') {
      return c.getAttribute('id').toString() === id;
    }
    if ('id' in c && typeof c.id === 'string') {
      return c.id === id;
    }
  });
}
