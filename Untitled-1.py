def isPrime(n):
    if n<2:
        return False
    if n==2 or n==3:
        return True
    count=0
    for i in range(1,n//2+1):
        if n%i==0:
            count+=1
    if count==1:
        return True
    return False
def sum1(r):
    count=0
    sum=0
    number=0
    while count<r:
        if isPrime(number):
            sum+=number
            count+=1
            print(number)
        number+=1
    print("sum is ",sum)
r=int(input("enter range:" ))
sum1(r)