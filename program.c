#include <stdio.h>
int main()
{
int x,y;
printf("multiplication table is:\n");
for (x=1; x<=2; x++)
{
printf("the table of %d is \n",x);
for (y=1; y<=5; y++)
{printf ("%d*%d=%d",x,y,x*y);
printf("\n");
}
}
}