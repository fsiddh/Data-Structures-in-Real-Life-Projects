lst = ['a', 'b', 'c', 'd', 'e', 'f']
result = list()

result = [ ''.join(x) for x in zip(lst[0::2], lst[1::2], lst[2::2])]
print(result)
